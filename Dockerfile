FROM python:3.11-slim

WORKDIR /app

# System deps some packages (reportlab, gTTS) may need
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Render sets $PORT at runtime — gunicorn must bind to it
ENV PORT=10000
EXPOSE 10000

CMD gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 app:app
