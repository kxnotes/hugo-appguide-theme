// FAQ 页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化手风琴效果
    initAccordion();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化分类筛选
    initCategoryFilter();
    
    // 初始化键盘快捷键
    initKeyboardShortcuts();
});

// 初始化手风琴效果
function initAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // 关闭其他打开的项目（可选：如果想要只允许一个打开）
            // faqItems.forEach(otherItem => {
            //     if (otherItem !== item) {
            //         otherItem.classList.remove('active');
            //         otherItem.querySelector('.toggle-icon').textContent = '+';
            //     }
            // });
            
            // 切换当前项目
            if (isActive) {
                item.classList.remove('active');
                toggleIcon.textContent = '+';
            } else {
                item.classList.add('active');
                toggleIcon.textContent = '−';
            }
        });
    });
}

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('faqSearchInput');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSections = document.querySelectorAll('.faq-section');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 显示所有项目
            faqItems.forEach(item => {
                item.style.display = 'block';
                item.classList.remove('highlight');
            });
            faqSections.forEach(section => {
                section.style.display = 'block';
            });
            updateSearchResults(faqItems.length, '');
            return;
        }
        
        let visibleCount = 0;
        const sectionVisibility = {};
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const category = item.dataset.category;
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                item.classList.add('highlight');
                visibleCount++;
                sectionVisibility[category] = true;
                
                // 高亮搜索词
                highlightSearchTerm(item, searchTerm);
            } else {
                item.style.display = 'none';
                item.classList.remove('highlight');
            }
        });
        
        // 显示/隐藏分类标题
        faqSections.forEach(section => {
            const sectionCategory = section.dataset.category;
            section.style.display = sectionVisibility[sectionCategory] ? 'block' : 'none';
        });
        
        updateSearchResults(visibleCount, searchTerm);
    });
}

// 高亮搜索词
function highlightSearchTerm(item, searchTerm) {
    const question = item.querySelector('.faq-question h3');
    const answer = item.querySelector('.faq-answer');
    
    // 移除之前的高亮
    question.innerHTML = question.textContent;
    
    // 添加新的高亮
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    question.innerHTML = question.textContent.replace(regex, '<mark>$1</mark>');
}

// 更新搜索结果
function updateSearchResults(count, searchTerm) {
    let existingResult = document.querySelector('.search-results');
    
    if (existingResult) {
        existingResult.remove();
    }
    
    if (searchTerm) {
        const resultDiv = document.createElement('div');
        resultDiv.className = 'search-results';
        resultDiv.innerHTML = `
            <p>搜索 "${searchTerm}" 找到 ${count} 个相关问题</p>
            ${count === 0 ? '<p class="no-results">没有找到匹配的问题，请尝试其他关键词或<a href="/guides.html">查看教程中心</a>。</p>' : ''}
        `;
        
        const faqContent = document.querySelector('.faq-content');
        faqContent.insertBefore(resultDiv, faqContent.firstChild);
    }
}

// 初始化分类筛选
function initCategoryFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const faqSections = document.querySelectorAll('.faq-section');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // 更新按钮状态
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 清空搜索
            const searchInput = document.getElementById('faqSearchInput');
            searchInput.value = '';
            
            // 移除搜索结果
            const existingResult = document.querySelector('.search-results');
            if (existingResult) {
                existingResult.remove();
            }
            
            // 筛选项目
            if (category === 'all') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                    item.classList.remove('highlight');
                });
                faqSections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                faqItems.forEach(item => {
                    if (item.dataset.category === category) {
                        item.style.display = 'block';
                        item.classList.remove('highlight');
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                faqSections.forEach(section => {
                    section.style.display = section.dataset.category === category ? 'block' : 'none';
                });
            }
        });
    });
}

// 初始化键盘快捷键
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('faqSearchInput').focus();
        }
        
        // ESC 清空搜索
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('faqSearchInput');
            if (document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        }
        
        // 数字键快速切换分类
        if (e.key >= '1' && e.key <= '6') {
            const index = parseInt(e.key) - 1;
            const categoryBtns = document.querySelectorAll('.category-btn');
            if (categoryBtns[index]) {
                categoryBtns[index].click();
            }
        }
    });
}

// 展开所有 FAQ 项目
function expandAll() {
    const faqItems = document.querySelectorAll('.faq-item:not([style*="display: none"])');
    faqItems.forEach(item => {
        item.classList.add('active');
        item.querySelector('.toggle-icon').textContent = '−';
    });
}

// 折叠所有 FAQ 项目
function collapseAll() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.classList.remove('active');
        item.querySelector('.toggle-icon').textContent = '+';
    });
}

// 添加展开/折叠所有按钮（可选功能）
function addExpandCollapseButtons() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'faq-controls';
    controlsDiv.innerHTML = `
        <button onclick="expandAll()" class="control-btn">展开所有</button>
        <button onclick="collapseAll()" class="control-btn">折叠所有</button>
    `;
    
    const faqContent = document.querySelector('.faq-content');
    faqContent.insertBefore(controlsDiv, faqContent.firstChild);
}

// 统计功能
function getFAQStats() {
    const totalItems = document.querySelectorAll('.faq-item').length;
    const categories = {};
    
    document.querySelectorAll('.faq-item').forEach(item => {
        const category = item.dataset.category;
        categories[category] = (categories[category] || 0) + 1;
    });
    
    console.log(`FAQ 统计: 总共 ${totalItems} 个问题`);
    console.log('分类统计:', categories);
    
    return { total: totalItems, categories };
}

// 页面加载完成后的初始化
window.addEventListener('load', function() {
    // 可选：添加展开/折叠按钮
    // addExpandCollapseButtons();
    
    // 可选：显示统计信息
    // getFAQStats();
    
    // 如果 URL 中有锚点，自动展开对应的 FAQ 项目
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement && targetElement.classList.contains('faq-item')) {
            targetElement.classList.add('active');
            targetElement.querySelector('.toggle-icon').textContent = '−';
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});