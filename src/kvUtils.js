// KV 네임스페이스 관리 유틸리티 함수들

/**
 * 도메인 매핑 추가/업데이트
 */
export async function setDomainMapping(kv, domain, r2Folder) {
  try {
    await kv.put(domain, r2Folder);
    
    return {
      success: true,
      message: `도메인 매핑이 설정되었습니다: ${domain} -> ${r2Folder}`,
      domain: domain,
      r2Folder: r2Folder
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 도메인 매핑 조회
 */
export async function getDomainMapping(kv, domain) {
  try {
    const r2Folder = await kv.get(domain);
    
    return {
      success: true,
      domain: domain,
      r2Folder: r2Folder,
      exists: r2Folder !== null
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 도메인 매핑 삭제
 */
export async function deleteDomainMapping(kv, domain) {
  try {
    await kv.delete(domain);
    
    return {
      success: true,
      message: `도메인 매핑이 삭제되었습니다: ${domain}`,
      domain: domain
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 모든 도메인 매핑 조회 (KV는 list 기능이 제한적이므로 주의)
 */
export async function listDomainMappings(kv) {
  try {
    // KV는 list 기능이 제한적이므로, 
    // 실제로는 미리 정의된 도메인 목록을 사용하거나
    // 다른 방법으로 관리해야 할 수 있습니다.
    
    return {
      success: true,
      message: "KV는 list 기능이 제한적입니다. 개별 도메인으로 조회하세요.",
      note: "개별 도메인 매핑은 getDomainMapping() 함수를 사용하세요."
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 도메인 매핑 검증 (R2 폴더 존재 여부 확인)
 */
export async function validateDomainMapping(kv, r2Bucket, domain) {
  try {
    const r2Folder = await kv.get(domain);
    
    if (!r2Folder) {
      return {
        success: false,
        message: `도메인 '${domain}'에 대한 매핑이 없습니다.`,
        domain: domain,
        exists: false
      };
    }

    // R2에서 해당 폴더의 index.html 존재 여부 확인
    const indexHtmlKey = `${r2Folder}/index.html`;
    const headResult = await r2Bucket.head(indexHtmlKey);
    
    return {
      success: true,
      domain: domain,
      r2Folder: r2Folder,
      indexHtmlExists: headResult !== null,
      indexHtmlKey: indexHtmlKey,
      fileSize: headResult?.size || 0
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
