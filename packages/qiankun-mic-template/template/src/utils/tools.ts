
/**
 * 获取随机数，min <= x < max
 * @param {number} min
 * @param {number} max
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 隐藏loading
 */
export function hideLoading() {
  const { VITE_REACT_APP_NAME } = import.meta.env;
  const loading = document?.getElementById?.(`${VITE_REACT_APP_NAME}_app_loading`);
  if (loading) {
    loading?.classList?.add?.('app_loading_hidden');
  }
}

/**
 * 获取url参数
 * @param {string} field
 */
export function getSearchParams(field: string) {
  const search = new URLSearchParams(window.location.search);
  return search.get(field);
}

/**
 * 添加或更新URL参数
 *
 * @param url 要添加或更新参数的URL
 * @param params 要添加或更新的参数对象，键为参数名，值为参数值
 * @returns 返回更新后的URL字符串
 * @throws 当提供的URL无效时，抛出异常
 */
export function addOrUpdateUrlParams(url: string, params: Record<string, string>): string {
  try {
    // Create a URL object
    const urlObj = new URL(url);

    // Loop through each parameter in the params object
    for (const [key, value] of Object.entries(params)) {
      // Set the parameter in the URL's search parameters
      urlObj.searchParams.set(key, value);
    }

    // Return the updated URL as a string
    return urlObj.toString();
  } catch (error) {
    console.error('Invalid URL provided:', error);
    throw new Error('Invalid URL');
  }
}

/** 设置主题 */
export function setTheme(theme: string) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/** 切换主题 */
export const toggleTheme = () => {
  const html = document.documentElement;
  const newTheme = html.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}
