// 에러 페이지 생성 함수들

/**
 * 404 HTML 페이지 생성 함수
 */
export function get404Html(hostname, message) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - 페이지를 찾을 수 없습니다</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        .error-code {
            font-size: 8rem;
            font-weight: bold;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .error-title {
            font-size: 2rem;
            margin: 1rem 0;
            font-weight: 300;
        }
        .error-message {
            font-size: 1.2rem;
            margin: 1rem 0;
            opacity: 0.9;
        }
        .domain-info {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
        }
        .domain-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }
        .domain-info p {
            margin: 0.5rem 0;
            font-family: monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.5rem;
            border-radius: 4px;
        }
        .back-button {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            margin-top: 1rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.3);
        }
        .back-button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="error-code">404</h1>
        <h2 class="error-title">페이지를 찾을 수 없습니다</h2>
        <p class="error-message">${message}</p>
        
        <div class="domain-info">
            <h3>요청 정보</h3>
            <p><strong>도메인:</strong> ${hostname}</p>
            <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        
        <a href="/" class="back-button">홈으로 돌아가기</a>
        
        <div class="footer">
            <p>Cloudflare Workers로 제공됩니다</p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * 500 HTML 페이지 생성 함수
 */
export function get500Html(hostname, message) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - 서버 오류</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        .error-code {
            font-size: 8rem;
            font-weight: bold;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .error-title {
            font-size: 2rem;
            margin: 1rem 0;
            font-weight: 300;
        }
        .error-message {
            font-size: 1.2rem;
            margin: 1rem 0;
            opacity: 0.9;
        }
        .domain-info {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
        }
        .domain-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }
        .domain-info p {
            margin: 0.5rem 0;
            font-family: monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.5rem;
            border-radius: 4px;
        }
        .back-button {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            margin-top: 1rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.3);
        }
        .back-button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="error-code">500</h1>
        <h2 class="error-title">서버 오류가 발생했습니다</h2>
        <p class="error-message">${message}</p>
        
        <div class="domain-info">
            <h3>요청 정보</h3>
            <p><strong>도메인:</strong> ${hostname}</p>
            <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        
        <a href="/" class="back-button">홈으로 돌아가기</a>
        
        <div class="footer">
            <p>Cloudflare Workers로 제공됩니다</p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * 403 HTML 페이지 생성 함수
 */
export function get403Html(hostname, message) {
  return `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - 접근 금지</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #feca57 0%, #ff9ff3 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
        }
        .container {
            text-align: center;
            max-width: 600px;
            padding: 2rem;
        }
        .error-code {
            font-size: 8rem;
            font-weight: bold;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .error-title {
            font-size: 2rem;
            margin: 1rem 0;
            font-weight: 300;
        }
        .error-message {
            font-size: 1.2rem;
            margin: 1rem 0;
            opacity: 0.9;
        }
        .domain-info {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 8px;
            margin: 2rem 0;
            backdrop-filter: blur(10px);
        }
        .domain-info h3 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }
        .domain-info p {
            margin: 0.5rem 0;
            font-family: monospace;
            background: rgba(0,0,0,0.2);
            padding: 0.5rem;
            border-radius: 4px;
        }
        .back-button {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            margin-top: 1rem;
            transition: all 0.3s ease;
            border: 1px solid rgba(255,255,255,0.3);
        }
        .back-button:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        .footer {
            margin-top: 3rem;
            font-size: 0.9rem;
            opacity: 0.7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="error-code">403</h1>
        <h2 class="error-title">접근이 금지되었습니다</h2>
        <p class="error-message">${message}</p>
        
        <div class="domain-info">
            <h3>요청 정보</h3>
            <p><strong>도메인:</strong> ${hostname}</p>
            <p><strong>시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
        </div>
        
        <a href="/" class="back-button">홈으로 돌아가기</a>
        
        <div class="footer">
            <p>Cloudflare Workers로 제공됩니다</p>
        </div>
    </div>
</body>
</html>`;
}
