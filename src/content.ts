console.log('content.ts')

function addCancelFavoriteButtons() {
  const newsNodes = document.querySelectorAll('.news-meta');
  newsNodes.forEach((node) => {
    // 检查是否已经存在取消收藏按钮
    if (!node.querySelector('.cancel-favorite-btn')) {
      const cancelButton = document.createElement('button');
      cancelButton.textContent = '取消收藏';
      cancelButton.className = 'cancel-favorite-btn';

      cancelButton.addEventListener('click', (event) => {
        event.preventDefault();
        const closestAnchor = node.closest('a');
        if (closestAnchor) {
          const href = closestAnchor.getAttribute('href');
          if (href) {
            const id = href.split('/').pop();
            if (id) {
              cancelFavorite(id);
            }
          }
        }
      });

      node.appendChild(cancelButton);
    }
  });
}

interface CancelFavoriteResponse {
  msg: string;
  status_code: number;
}

const cancelFavorite = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`https://apiv3.shanbay.com/news/user/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ operation: 'disfavor' }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CancelFavoriteResponse = await response.json();

    if (data.status_code === 0) {
      console.log(`成功取消收藏文章 ID: ${id}`);
      // 这里可以添加更新 UI 的逻辑，比如移除对应的文章元素
    } else {
      console.error(`取消收藏失败: ${data.msg}`);
    }
  } catch (error) {
    console.error('取消收藏时发生错误:', error);
    // 这里可以添加错误处理逻辑，比如显示错误消息给用户
  }
};

const addPaginationChanger = () => {
  console.log('addPaginationChanger')
}

const main = async () => {
  if (window.location.href === 'https://web.shanbay.com/reading/web-news/articles/mine') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const newsMetaElements = document.querySelectorAll('.news-meta');
          if (newsMetaElements.length > 0) {
            addCancelFavoriteButtons();
            addPaginationChanger();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // 添加点击事件监听器到 document
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.tab-title')) {
        // 如果点击的是 tab-title 或其子元素，等待一段时间后重新添加按钮
        setTimeout(() => {
          addCancelFavoriteButtons();
          addPaginationChanger();
        }, 500); // 500ms 延迟，可以根据实际情况调整
      }
    });
  }
}

main()