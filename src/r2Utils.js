// R2 유틸리티 함수들

/**
 * 특정 폴더의 모든 파일 목록 조회
 */
export async function listFilesInFolder(bucket, folderPath) {
  try {
    const prefix = folderPath.endsWith('/') ? folderPath : `${folderPath}/`;
    const result = await bucket.list({ prefix });
    
    return {
      success: true,
      files: result.objects.map(obj => ({
        key: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
        etag: obj.etag
      })),
      count: result.objects.length
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 파일 업로드
 */
export async function uploadFile(bucket, key, content, contentType = 'text/plain') {
  try {
    await bucket.put(key, content, {
      httpMetadata: {
        contentType: contentType
      }
    });
    
    return {
      success: true,
      message: `파일이 성공적으로 업로드되었습니다: ${key}`,
      key: key
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 파일 삭제
 */
export async function deleteFile(bucket, key) {
  try {
    await bucket.delete(key);
    
    return {
      success: true,
      message: `파일이 성공적으로 삭제되었습니다: ${key}`,
      key: key
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 파일 복사
 */
export async function copyFile(bucket, sourceKey, destinationKey) {
  try {
    const sourceObject = await bucket.get(sourceKey);
    if (!sourceObject) {
      return {
        success: false,
        error: `원본 파일을 찾을 수 없습니다: ${sourceKey}`
      };
    }
    
    const content = await sourceObject.arrayBuffer();
    await bucket.put(destinationKey, content, {
      httpMetadata: sourceObject.httpMetadata
    });
    
    return {
      success: true,
      message: `파일이 성공적으로 복사되었습니다: ${sourceKey} → ${destinationKey}`,
      sourceKey,
      destinationKey
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * 파일 메타데이터 업데이트
 */
export async function updateFileMetadata(bucket, key, metadata) {
  try {
    const object = await bucket.get(key);
    if (!object) {
      return {
        success: false,
        error: `파일을 찾을 수 없습니다: ${key}`
      };
    }
    
    const content = await object.arrayBuffer();
    await bucket.put(key, content, {
      httpMetadata: {
        ...object.httpMetadata,
        ...metadata
      },
      customMetadata: {
        ...object.customMetadata,
        ...metadata.customMetadata
      }
    });
    
    return {
      success: true,
      message: `파일 메타데이터가 업데이트되었습니다: ${key}`,
      key: key
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}
