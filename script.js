document.addEventListener('DOMContentLoaded', () => {
    const apiList = document.getElementById('api-list');
    const responseOutput = document.getElementById('response-output');
    const apiTitle = document.getElementById('api-title');
    const apiDescription = document.getElementById('api-description');
    const apiInputContainer = document.getElementById('api-input-container');
    const proxy = 'https://cors-anywhere.herokuapp.com/';

    const apis = {
        '60秒读懂世界': { url: 'https://60s.viki.moe/60s', requiresInput: false },
        '必应壁纸': { url: 'https://60s.viki.moe/bing', requiresInput: false },
        '历史上的今天': { url: 'https://60s.viki.moe/history', requiresInput: false },
        'Epic喜加一': { url: 'https://60s.viki.moe/epic', requiresInput: false },
        '知乎热榜': { url: 'https://60s.viki.moe/hot/zhihu', requiresInput: false },
        '微博热榜': { url: 'https://60s.viki.moe/hot/weibo', requiresInput: false },
        'B站热榜': { url: 'https://60s.viki.moe/hot/bilibili', requiresInput: false },
        '抖音热榜': { url: 'https://60s.viki.moe/hot/douyin', requiresInput: false },
        '小红书热榜': { url: 'https://60s.viki.moe/hot/xiaohongshu', requiresInput: false },
        '今日头条热榜': { url: 'https://60s.viki.moe/hot/toutiao', requiresInput: false },
        '百度热榜': { url: 'https://60s.viki.moe/hot/baidu', requiresInput: false },
        '懂车帝热榜': { url: 'https://60s.viki.moe/hot/dongchedi', requiresInput: false },
        '网易云音乐热榜': { url: 'https://60s.viki.moe/hot/netease', requiresInput: false },
        'Hacker News热榜': { url: 'https://60s.viki.moe/hot/hackernews', requiresInput: false },
        '猫眼实时票房': { url: 'https://60s.viki.moe/hot/maoyan_movie', requiresInput: false },
        '猫眼实时剧集': { url: 'https://60s.viki.moe/hot/maoyan_tv', requiresInput: false },
        '随机笑话': { url: 'https://60s.viki.moe/joke', requiresInput: false },
        '随机一言': { url: 'https://60s.viki.moe/yiyan', requiresInput: false },
        'KFC疯狂星期四': { url: 'https://60s.viki.moe/kfc', requiresInput: false },
        '货币汇率': { url: 'https://60s.viki.moe/currency', requiresInput: false },
        '实时天气': { url: 'https://60s.viki.moe/weather', requiresInput: true, paramName: 'city', prompt: '请输入城市名 (例如: 北京)' },
        '天气预报': { url: 'https://60s.viki.moe/forecast', requiresInput: true, paramName: 'city', prompt: '请输入城市名 (例如: 上海)' },
        '生成二维码': { url: 'https://60s.viki.moe/qr', requiresInput: true, paramName: 'text', prompt: '请输入要生成二维码的文本' },
        '百度百科': { url: 'https://60s.viki.moe/baike', requiresInput: true, paramName: 'keyword', prompt: '请输入关键词' },
        '在线翻译': { url: 'https://60s.viki.moe/translate', requiresInput: true, paramName: 'text', prompt: '请输入要翻译的文本' },
        '公网IP地址': { url: 'https://60s.viki.moe/ip', requiresInput: false },
        '链接OG信息': { url: 'https://60s.viki.moe/og', requiresInput: true, paramName: 'url', prompt: '请输入完整的URL' },
        '身体健康分析': { url: 'https://60s.viki.moe/health', requiresInput: false },
        '密码生成器': { url: 'https://60s.viki.moe/password', requiresInput: false },
        '密码强度检测': { url: 'https://60s.viki.moe/password_strength', requiresInput: true, paramName: 'password', prompt: '请输入要检测的密码' },
        '随机颜色': { url: 'https://60s.viki.moe/color', requiresInput: false },
        '配色方案': { url: 'https://60s.viki.moe/color_scheme', requiresInput: false },
        '随机唱歌': { url: 'https://60s.viki.moe/sing', requiresInput: false },
        '随机运势': { url: 'https://60s.viki.moe/fortune', requiresInput: false },
        '随机JS趣味题': { url: 'https://60s.viki.moe/js_question', requiresInput: false },
        '随机发病文学': { url: 'https://60s.viki.moe/sick_literature', requiresInput: false },
        '随机答案之书': { url: 'https://60s.viki.moe/answer_book', requiresInput: false },
        '随机冷笑话': { url: 'https://60s.viki.moe/cold_joke', requiresInput: false }
    };

    const fetchData = async (url, name, inputValue = null, paramName = null) => {
        let finalUrl = url;
        if (inputValue && paramName) {
            finalUrl = `${url}?${paramName}=${encodeURIComponent(inputValue)}`;
        }

        apiDescription.textContent = `正在获取 API: ${name} 的数据...`;
        responseOutput.textContent = '正在加载...';

        try {
            const response = await fetch(proxy + finalUrl);
            if (!response.ok) {
                throw new Error(`HTTP 错误! 状态: ${response.status}`);
            }
            const data = await response.json();
            responseOutput.textContent = JSON.stringify(data, null, 2);
        } catch (error) {
            responseOutput.textContent = `获取数据失败: ${error.message}`;
            apiDescription.textContent = `API: ${name} 数据获取失败`;
        }
    };

    const updateInputUI = (apiName) => {
        const api = apis[apiName];
        apiTitle.textContent = apiName;
        apiInputContainer.innerHTML = ''; // Clear previous input

        if (api.requiresInput) {
            apiDescription.textContent = `此 API 需要输入参数。`;
            responseOutput.textContent = '请输入参数并点击“获取”按钮。';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = api.prompt;
            input.className = 'api-input';

            const button = document.createElement('button');
            button.textContent = '获取数据';
            button.className = 'api-submit-btn';

            button.addEventListener('click', () => {
                if (input.value) {
                    fetchData(api.url, apiName, input.value, api.paramName);
                } else {
                    responseOutput.textContent = '错误：输入不能为空。';
                }
            });
            
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    button.click();
                }
            });

            apiInputContainer.appendChild(input);
            apiInputContainer.appendChild(button);
            input.focus();

        } else {
            apiDescription.textContent = `正在获取 API: ${apiName} 的数据...`;
            fetchData(api.url, apiName);
        }
    };

    for (const name in apis) {
        const li = document.createElement('li');
        li.className = 'api-item';
        li.textContent = name;
        li.addEventListener('click', (e) => {
            document.querySelectorAll('.api-item').forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            updateInputUI(name);
        });
        apiList.appendChild(li);
    }
});
