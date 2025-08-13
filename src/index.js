import { renderHtml } from "./renderHtml.js";
import { get404Html, get500Html } from "./errorPages.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const hostname = url.hostname;

    // 모든 요청을 도메인 기반으로 처리 - hostname으로 KV 조회 후 R2에서 index.html 찾기
    return await serveDomainIndex(env, hostname);
  },
};

// 도메인 기반 라우팅 함수 - KV에서 폴더 매핑 조회 후 R2에서 index.html 찾기
async function serveDomainIndex(env, hostname) {
  try {
    console.log(`도메인 라우팅 요청: ${hostname}`);

    // 1. KV에서 도메인에 해당하는 R2 폴더 매핑 조회
    const r2Folder = await env.DOMAIN_MAPPING.get(hostname);
    
    if (!r2Folder) {
      console.log(`KV에서 도메인 매핑을 찾을 수 없음: ${hostname}`);
      return new Response(get404Html(hostname, "도메인 매핑을 찾을 수 없습니다"), {
        headers: { "content-type": "text/html" },
        status: 404
      });
    }

    console.log(`도메인 ${hostname} -> R2 폴더: ${r2Folder}`);

    // 2. R2에서 해당 폴더의 index.html 파일 가져오기
    const indexHtmlKey = `${r2Folder}/index.html`;
    
    try {
      const fileObject = await env.MY_BUCKET.get(indexHtmlKey);
      
      if (!fileObject) {
        console.log(`R2에서 index.html 파일을 찾을 수 없음: ${indexHtmlKey}`);
        return new Response(get404Html(hostname, "index.html 파일을 찾을 수 없습니다"), {
          headers: { "content-type": "text/html" },
          status: 404
        });
      }

      // 3. 파일 내용과 메타데이터 가져오기
      const fileContent = await fileObject.text();
      const contentType = fileObject.httpMetadata?.contentType || "text/html";

            console.log(`성공적으로 index.html 제공: ${hostname} -> ${indexHtmlKey} (${fileObject.size} bytes)`);

      // 5. HTML 파일 반환
      return new Response(fileContent, {
        headers: {
          "content-type": contentType,
          "cache-control": "public, max-age=3600", // 1시간 캐시
          "x-served-by": "Cloudflare Workers",
          "x-domain": hostname,
          "x-r2-folder": r2Folder
        }
      });
      
    } catch (error) {
      console.log(`R2에서 index.html 파일을 가져오는 중 오류 발생: ${indexHtmlKey} - ${error.message}`);
      return new Response(get404Html(hostname, "index.html 파일을 찾을 수 없습니다"), {
        headers: { "content-type": "text/html" },
        status: 404
      });
    }

  } catch (error) {
    console.error(`도메인 라우팅 오류: ${error.message}`);
    return new Response(get500Html(hostname, "도메인 라우팅 중 오류가 발생했습니다"), {
      headers: { "content-type": "text/html" },
      status: 500
    });
  }
}