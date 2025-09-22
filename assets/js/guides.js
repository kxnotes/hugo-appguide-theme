// 教程页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterTags = document.querySelectorAll('.filter-tag');
    const guideArticles = document.querySelectorAll('.guide-article');
    const guideSections = document.querySelectorAll('.guides-section');

    // 搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        filterArticles(searchTerm, getCurrentCategory());
    });

    // 分类筛选功能
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 更新活跃状态
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const searchTerm = searchInput.value.toLowerCase().trim();
            filterArticles(searchTerm, category);
        });
    });

    // 获取当前选中的分类
    function getCurrentCategory() {
        const activeTag = document.querySelector('.filter-tag.active');
        return activeTag ? activeTag.dataset.category : 'all';
    }

    // 筛选文章
    function filterArticles(searchTerm, category) {
        let visibleCount = 0;
        const sectionVisibility = {};

        guideArticles.forEach(article => {
            const title = article.querySelector('h3 a').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            const articleCategory = article.dataset.category;
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                content.includes(searchTerm);
            
            const matchesCategory = category === 'all' || articleCategory === category;
            
            if (matchesSearch && matchesCategory) {
                article.style.display = 'block';
                article.classList.add('fade-in');
                visibleCount++;
                
                // 记录该分类有可见文章
                sectionVisibility[articleCategory] = true;
            } else {
                article.style.display = 'none';
                article.classList.remove('fade-in');
            }
        });

        // 显示/隐藏分类标题
        guideSections.forEach(section => {
            const sectionCategory = section.dataset.category;
            if (category === 'all') {
                // 显示所有分类，但只显示有内容的
                const hasVisibleArticles = Array.from(section.querySelectorAll('.guide-article'))
                    .some(article => article.style.display !== 'none');
                section.style.display = hasVisibleArticles ? 'block' : 'none';
            } else {
                // 只显示选中的分类
                section.style.display = sectionCategory === category ? 'block' : 'none';
            }
        });

        // 显示搜索结果统计
        updateSearchResults(visibleCount, searchTerm);
    }

    // 更新搜索结果统计
    function updateSearchResults(count, searchTerm) {
        let existingResult = document.querySelector('.search-results');
        
        if (existingResult) {
            existingResult.remove();
        }

        if (searchTerm) {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'search-results';
            resultDiv.innerHTML = `
                <p>搜索 "${searchTerm}" 找到 ${count} 个结果</p>
                ${count === 0 ? '<p class="no-results">没有找到匹配的教程，请尝试其他关键词。</p>' : ''}
            `;
            
            const guidesContent = document.querySelector('.guides-content');
            guidesContent.insertBefore(resultDiv, guidesContent.firstChild);
        }
    }

    // 文章卡片悬停效果
    guideArticles.forEach(article => {
        article.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        article.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 平滑滚动到分类
    function scrollToSection(category) {
        const section = document.querySelector(`[data-category="${category}"]`);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }

    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // ESC 清空搜索
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    });

    // 添加搜索框占位符动画
    const placeholders = [
        '搜索教程...',
        '试试搜索 "Windows"',
        '试试搜索 "订阅"',
        '试试搜索 "连接失败"'
    ];
    
    let placeholderIndex = 0;
    setInterval(() => {
        if (searchInput.value === '' && document.activeElement !== searchInput) {
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            searchInput.placeholder = placeholders[placeholderIndex];
        }
    }, 3000);
});

// 文章阅读进度跟踪（可选功能）
function trackReadingProgress() {
    const articles = document.querySelectorAll('.guide-article');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const articleTitle = entry.target.querySelector('h3 a').textContent;
                console.log(`用户正在查看: ${articleTitle}`);
                // 这里可以添加分析代码
            }
        });
    }, {
        threshold: 0.5
    });
    
    articles.forEach(article => {
        observer.observe(article);
    });
}

// 初始化阅读进度跟踪
trackReadingProgress();