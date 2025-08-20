// 校验和数据（示例数据，实际应该从 API 获取）
const checksums = {
    'windows': {
        'exe': 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        'zip': 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a'
    },
    'macos-arm': {
        'dmg': 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2'
    },
    'macos-intel': {
        'dmg': 'd4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3'
    },
    'android': {
        'apk': 'e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4'
    },
    'linux': {
        'appimage': 'f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5'
    }
};

// 显示校验和弹窗
function showChecksum(platform) {
    const modal = document.getElementById('checksumModal');
    const content = document.getElementById('checksumContent');
    
    let checksumHtml = '<div class="checksum-list">';
    
    if (checksums[platform]) {
        Object.entries(checksums[platform]).forEach(([type, hash]) => {
            checksumHtml += `
                <div class="checksum-item">
                    <strong>${type.toUpperCase()}:</strong>
                    <code class="checksum-hash">${hash}</code>
                    <button class="copy-btn" onclick="copyToClipboard('${hash}')">复制</button>
                </div>
            `;
        });
    } else {
        checksumHtml += '<p>暂无校验和信息</p>';
    }
    
    checksumHtml += '</div>';
    checksumHtml += `
        <div class="checksum-help">
            <h4>如何验证文件完整性？</h4>
            <p><strong>Windows:</strong> 在命令提示符中运行 <code>certutil -hashfile 文件名 SHA256</code></p>
            <p><strong>macOS/Linux:</strong> 在终端中运行 <code>shasum -a 256 文件名</code></p>
            <p>将输出的哈希值与上述值进行比较，确保完全一致。</p>
        </div>
    `;
    
    content.innerHTML = checksumHtml;
    modal.style.display = 'block';
}

// 复制到剪贴板
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        // 显示复制成功提示
        showToast('已复制到剪贴板');
    }).catch(err => {
        console.error('复制失败:', err);
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('已复制到剪贴板');
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
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// 模态框控制
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('checksumModal');
    const closeBtn = document.querySelector('.close');
    
    // 关闭按钮
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }
    
    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
    
    // ESC 键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});

// 检查最新版本（可选功能）
async function checkLatestVersion() {
    try {
        const response = await fetch('https://api.github.com/repos/hiddify/hiddify-next/releases/latest');
        const data = await response.json();
        
        // 更新页面上的版本信息
        const versionBadges = document.querySelectorAll('.version-badge:not(.coming-soon)');
        versionBadges.forEach(badge => {
            badge.textContent = data.tag_name;
        });
        
        // 更新日期
        const dateElements = document.querySelectorAll('.col-date');
        const releaseDate = new Date(data.published_at).toLocaleDateString('zh-CN');
        dateElements.forEach((element, index) => {
            if (index < dateElements.length - 1) { // 排除 iOS 行
                element.textContent = releaseDate;
            }
        });
        
    } catch (error) {
        console.log('无法获取最新版本信息:', error);
    }
}

// 页面加载时检查最新版本
document.addEventListener('DOMContentLoaded', checkLatestVersion);