document.addEventListener('DOMContentLoaded', () => {
    const apiList = document.getElementById('api-list');
    const responseOutput = document.getElementById('response-output');
    const apiTitle = document.getElementById('api-title');
    const apiDescription = document.getElementById('api-description');

    const apis = {
        '60秒读懂世界': 'https://60s.viki.moe/60s',
        '必应壁纸': 'https://60s.viki.moe/bing',
        '历史上的今天': 'https://60s.viki.moe/history',
        'Epic喜加一': 'https://60s.viki.moe/epic',
        '知乎热榜': 'https://60s.viki.moe/hot/zhihu',
        '微博热榜': 'https://60s.viki.moe/hot/weibo',
        'B站热榜': 'https://60s.viki.moe/hot/bilibili',
        '抖音热榜': 'https://60s.viki.moe/hot/douyin',
        '小红书热榜': 'https://60s.viki.moe/hot/xiaohongshu',
        '今日头条热榜': 'https://60s.viki.moe/hot/toutiao',
        '百度热榜': 'https://60s.viki.moe/hot/baidu',
        '懂车帝热榜': 'https://60s.viki.moe/hot/dongchedi',
        '网易云音乐热榜': 'https://60s.viki.moe/hot/netease',
        'Hacker News热榜': 'https://60s.viki.moe/hot/hackernews',
        '猫眼实时票房': 'https://60s.viki.moe/hot/maoyan_movie',
        '猫眼实时剧集': 'https://60s.viki.moe/hot/maoyan_tv',
        '随机笑话': 'https://60s.viki.moe/joke',
        '随机一言': 'https://60s.viki.moe/yiyan',
        'KFC疯狂星期四': 'https://60s.viki.moe/kfc',
        '货币汇率': 'https://60s.viki.moe/currency',
        '实时天气': 'https://60s.viki.moe/weather',
        '天气预报': 'https://60s.viki.moe/forecast',
        '生成二维码': 'https://60s.viki.moe/qr',
        '百度百科': 'https://60s.viki.moe/baike',
        '在线翻译': 'https://60s.viki.moe/translate',
        '公网IP地址': 'https://60s.viki.moe/ip',
        '链接OG信息': 'https://60s.viki.moe/og',
        '身体健康分析': 'https://60s.viki.moe/health',
        '密码生成器': 'https://60s.viki.moe/password',
        '密码强度检测': 'https://60s.viki.moe/password_strength',
        '随机颜色': 'https://60s.viki.moe/color',
        '配色方案': 'https://60s.viki.moe/color_scheme',
        '随机唱歌': 'https://60s.viki.moe/sing',
        '随机运势': 'https://60s.viki.moe/fortune',
        '随机JS趣味题': 'https://60s.viki.moe/js_question',
        '随机发病文学': 'https://60s.viki.moe/sick_literature',
        '随机答案之书': 'https://60s.viki.moe/answer_book',
        '随机冷笑话': 'https://60s.viki.moe/cold_joke'
    };

    const fetchData = async (url, name) => {
        apiTitle.textContent = name;
        apiDescription.textContent = `正在获取 API: ${name} 的数据...`;
        responseOutput.textContent = '正在加载...';

        try {
            const response = await fetch(url);
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

    for (const name in apis) {
        const li = document.createElement('li');
        li.className = 'api-item';
        li.textContent = name;
        li.dataset.url = apis[name];
        li.addEventListener('click', (e) => {
            document.querySelectorAll('.api-item').forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            fetchData(apis[name], name);
        });
        apiList.appendChild(li);
    }
});
