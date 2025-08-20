// 文章页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 目录导航功能
    initTableOfContents();
    
    // 阅读进度指示器
    initReadingProgress();
    
    // 代码复制功能
    initCodeCopy();
    
    // 图片懒加载
    initImageLazyLoad();
    
    // 平滑滚动
    initSmoothScroll();
});

// 初始化目录导航
function initTableOfContents() {
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    const sections = document.querySelectorAll('.content-section');
    
    // 为每个章节添加 ID
    sections.forEach((section, index) => {
        const heading = section.querySelector('h2');
        if (heading) {
            const id = heading.textContent.replace(/[^\w\u4e00-\u9fa5]/g, '');
            section.id = id;
        }
    });
    
    // 监听滚动，高亮当前章节
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateActiveSection);
            ticking = true;
        }
    });
    
    function updateActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                tocLinks.forEach(link => link.classList.remove('active'));
                if (tocLinks[index]) {
                    tocLinks[index].classList.add('active');
                }
            }
        });
        
        ticking = false;
    }
}

// 初始化阅读进度指示器
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateReadingProgress);
    
    function updateReadingProgress() {
        const article = document.querySelector('.article-body');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        
        const progress = Math.max(0, Math.min(100, 
            ((scrollTop - articleTop + windowHeight) / articleHeight) * 100
        ));
        
        progressBar.style.width = progress + '%';
    }
}

// 初始化代码复制功能
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(code => {
        if (code.textContent.length > 10) {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-code-btn';
            copyBtn.innerHTML = '📋';
            copyBtn.title = '复制代码';
            
            const wrapper = document.createElement('div');
            wrapper.className = 'code-wrapper';
            code.parentNode.insertBefore(wrapper, code);
            wrapper.appendChild(code);
            wrapper.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(code.textContent).then(() => {
                    copyBtn.innerHTML = '✅';
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋';
                    }, 2000);
                });
            });
        }
    });
}

// 初始化图片懒加载
function initImageLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 复制文章链接
function copyArticleLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        showToast('文章链接已复制到剪贴板');
    }).catch(() => {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('文章链接已复制到剪贴板');
    });
}

// 显示提示消息
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(toast)) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // 按 T 键显示/隐藏目录
    if (e.key === 't' || e.key === 'T') {
        const sidebar = document.querySelector('.article-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
        }
    }
    
    // 按 P 键打印
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});

// 文章反馈功能（可选）
function initArticleFeedback() {
    const feedbackSection = document.createElement('div');
    feedbackSection.className = 'article-feedback';
    feedbackSection.innerHTML = `
        <h4>这篇教程对您有帮助吗？</h4>
        <div class="feedback-buttons">
            <button class="feedback-btn positive" onclick="submitFeedback('positive')">
                👍 有帮助
            </button>
            <button class="feedback-btn negative" onclick="submitFeedback('negative')">
                👎 需要改进
            </button>
        </div>
        <div class="feedback-result" style="display: none;"></div>
    `;
    
    const articleFooter = document.querySelector('.article-footer');
    if (articleFooter) {
        articleFooter.appendChild(feedbackSection);
    }
}

// 提交反馈
function submitFeedback(type) {
    const resultDiv = document.querySelector('.feedback-result');
    const buttonsDiv = document.querySelector('.feedback-buttons');
    
    if (type === 'positive') {
        resultDiv.innerHTML = '<p style="color: #10b981;">感谢您的反馈！我们会继续努力提供更好的教程。</p>';
    } else {
        resultDiv.innerHTML = '<p style="color: #f59e0b;">感谢您的反馈！请通过页面底部的联系方式告诉我们如何改进。</p>';
    }
    
    buttonsDiv.style.display = 'none';
    resultDiv.style.display = 'block';
    
    // 这里可以添加实际的反馈提交逻辑
    console.log(`用户反馈: ${type} - 文章: ${document.title}`);
}

// 初始化反馈功能
initArticleFeedback();