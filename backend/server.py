"""
A股宏观看板 — Flask 服务器
===========================
1. 提供静态文件服务（前端 HTML/CSS/JS）
2. 提供 /api/data 端点返回最新数据 JSON
3. 提供 /api/refresh 端点触发数据刷新
4. 提供 /api/glossary 端点返回数据字典
5. 支持定时自动刷新

用法:
    python backend/server.py                        # 启动服务器（默认 8080 端口）
    python backend/server.py --port 3000            # 指定端口
    python backend/server.py --auto-refresh 30      # 每30分钟自动刷新数据
"""

import json
import os
import sys
import argparse
import threading
import time
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS

# Add parent to path so we can import data_fetcher
sys.path.insert(0, str(Path(__file__).parent))
from data_fetcher import main as fetch_data, OUTPUT_FILE, ROOT

# ---------------------------------------------------------------------------
# Flask App
# ---------------------------------------------------------------------------
app = Flask(__name__, static_folder=str(ROOT), static_url_path='')
CORS(app)

GLOSSARY_FILE = Path(__file__).parent / 'glossary.json'

# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route('/')
def index():
    return send_from_directory(str(ROOT), 'index.html')

@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory(str(ROOT), filename)

@app.route('/api/data')
def get_data():
    """Return the latest data JSON."""
    if OUTPUT_FILE.exists():
        with open(OUTPUT_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({'error': 'No data yet. Run /api/refresh first.'}), 404

@app.route('/api/refresh', methods=['POST', 'GET'])
def refresh_data():
    """Trigger a data refresh."""
    try:
        # Set FRED key from query param or env
        fred_key = request.args.get('fred_key', os.environ.get('FRED_API_KEY', ''))
        if fred_key:
            os.environ['FRED_API_KEY'] = fred_key

        # Run fetcher in a thread to avoid blocking
        def do_refresh():
            sys.argv = ['data_fetcher.py']  # Reset argv for argparse
            if not fred_key:
                sys.argv.append('--skip-fred')
            fetch_data()

        t = threading.Thread(target=do_refresh)
        t.start()

        return jsonify({
            'status': 'refresh_started',
            'time': datetime.now().isoformat(),
            'message': '数据刷新已启动，约30-60秒后完成。刷新页面查看最新数据。'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/glossary')
def get_glossary():
    """Return the data glossary/dictionary."""
    if GLOSSARY_FILE.exists():
        with open(GLOSSARY_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    return jsonify({'error': 'Glossary not found'}), 404

@app.route('/api/status')
def status():
    """Return server and data status."""
    data_exists = OUTPUT_FILE.exists()
    data_time = None
    if data_exists:
        data_time = datetime.fromtimestamp(OUTPUT_FILE.stat().st_mtime).isoformat()

    return jsonify({
        'server': 'running',
        'time': datetime.now().isoformat(),
        'data_available': data_exists,
        'data_last_updated': data_time,
        'data_file': str(OUTPUT_FILE),
    })

# ---------------------------------------------------------------------------
# Auto-refresh scheduler
# ---------------------------------------------------------------------------
def auto_refresh_loop(interval_minutes, fred_key):
    """Background thread that refreshes data on a schedule."""
    while True:
        time.sleep(interval_minutes * 60)
        print(f"\n[Auto-refresh] Triggered at {datetime.now().isoformat()}")
        try:
            if fred_key:
                os.environ['FRED_API_KEY'] = fred_key
            sys.argv = ['data_fetcher.py']
            if not fred_key:
                sys.argv.append('--skip-fred')
            fetch_data()
        except Exception as e:
            print(f"[Auto-refresh] Error: {e}")

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description='A股宏观看板服务器')
    parser.add_argument('--port', type=int, default=8080, help='Server port (default: 8080)')
    parser.add_argument('--host', type=str, default='127.0.0.1', help='Server host')
    parser.add_argument('--auto-refresh', type=int, default=0,
                        help='Auto-refresh interval in minutes (0=disabled)')
    parser.add_argument('--fred-key', type=str, default=None,
                        help='FRED API Key')
    parser.add_argument('--fetch-on-start', action='store_true',
                        help='Fetch data immediately on server start')
    args = parser.parse_args()

    fred_key = args.fred_key or os.environ.get('FRED_API_KEY', '')

    # Fetch on start if requested
    if args.fetch_on_start:
        print("Fetching data on startup...")
        if fred_key:
            os.environ['FRED_API_KEY'] = fred_key
        sys.argv = ['data_fetcher.py']
        if not fred_key:
            sys.argv.append('--skip-fred')
        try:
            fetch_data()
        except Exception as e:
            print(f"Initial fetch error: {e}")

    # Start auto-refresh thread
    if args.auto_refresh > 0:
        print(f"Auto-refresh enabled: every {args.auto_refresh} minutes")
        t = threading.Thread(target=auto_refresh_loop,
                           args=(args.auto_refresh, fred_key), daemon=True)
        t.start()

    print(f"\n{'='*60}")
    print(f"A股宏观看板 — 服务器启动")
    print(f"  地址: http://{args.host}:{args.port}")
    print(f"  数据: http://{args.host}:{args.port}/api/data")
    print(f"  刷新: http://{args.host}:{args.port}/api/refresh")
    print(f"  字典: http://{args.host}:{args.port}/api/glossary")
    print(f"  状态: http://{args.host}:{args.port}/api/status")
    print(f"{'='*60}\n")

    app.run(host=args.host, port=args.port, debug=False)

if __name__ == '__main__':
    main()
