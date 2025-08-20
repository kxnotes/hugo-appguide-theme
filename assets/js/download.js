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
    modal.classList.remove('hidden');
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
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.classList.add('hidden');
        }
    }
    
    // 点击模态框外部关闭
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.add('hidden');
        }
    }
    
    // ESC 键关闭
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
            modal.classList.add('hidden');
        }
    });
});

// 检查最新版本并更新下载信息
async function checkLatestVersion() {
    try {
        const response = await fetch('https://api.github.com/repos/hiddify/hiddify-next/releases/latest');
        const data = await response.json();
        
        // 更新版本信息
        updateVersionInfo(data);
        
        // 更新下载链接
        updateDownloadLinks(data.assets);
        
        // 获取并更新SHA256值（如果可用）
        await updateSHA256Checksums(data.assets);
        
    } catch (error) {
        console.log('无法获取最新版本信息:', error);
    }
}

// 更新版本和日期信息
function updateVersionInfo(releaseData) {
    // 更新版本徽章（排除iOS）
    document.querySelectorAll('span:contains("v2.0.5")').forEach(badge => {
        if (!badge.closest('.table-row')?.textContent.includes('iOS')) {
            badge.textContent = releaseData.tag_name;
        }
    });
    
    // 更新发布日期
    const releaseDate = new Date(releaseData.published_at).toLocaleDateString('zh-CN');
    const dateElements = document.querySelectorAll('.grid .grid-cols-1 .text-gray-600');
    dateElements.forEach(element => {
        if (element.textContent.includes('2024-12-15')) {
            element.textContent = releaseDate;
        }
    });
}

// 更新下载链接
function updateDownloadLinks(assets) {
    const assetMap = {};
    
    // 分析assets创建映射
    assets.forEach(asset => {
        const name = asset.name.toLowerCase();
        if (name.includes('windows') && name.endsWith('.exe')) {
            assetMap['windows-exe'] = asset.browser_download_url;
        } else if (name.includes('windows') && name.endsWith('.zip')) {
            assetMap['windows-zip'] = asset.browser_download_url;
        } else if (name.includes('macos') && name.includes('arm64') && name.endsWith('.dmg')) {
            assetMap['macos-arm'] = asset.browser_download_url;
        } else if (name.includes('macos') && name.includes('intel') && name.endsWith('.dmg')) {
            assetMap['macos-intel'] = asset.browser_download_url;
        } else if (name.includes('android') && name.endsWith('.apk')) {
            assetMap['android'] = asset.browser_download_url;
        } else if (name.includes('linux') && name.endsWith('.appimage')) {
            assetMap['linux'] = asset.browser_download_url;
        }
    });
    
    // 更新页面上的下载链接
    document.querySelectorAll('a[href*="releases/latest"]').forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes('.exe') && assetMap['windows-exe']) {
            link.href = assetMap['windows-exe'];
        } else if (text.includes('.zip') && assetMap['windows-zip']) {
            link.href = assetMap['windows-zip'];
        } else if (text.includes('.dmg')) {
            const row = link.closest('.grid');
            if (row?.textContent.includes('Apple Silicon') && assetMap['macos-arm']) {
                link.href = assetMap['macos-arm'];
            } else if (row?.textContent.includes('Intel') && assetMap['macos-intel']) {
                link.href = assetMap['macos-intel'];
            }
        } else if (text.includes('.apk') && assetMap['android']) {
            link.href = assetMap['android'];
        } else if (text.includes('.appimage') && assetMap['linux']) {
            link.href = assetMap['linux'];
        }
    });
}

// 获取SHA256校验码（从release notes或separate API）
async function updateSHA256Checksums(assets) {
    try {
        // 尝试找到checksums文件
        const checksumAsset = assets.find(asset => 
            asset.name.toLowerCase().includes('checksum') || 
            asset.name.toLowerCase().includes('sha256')
        );
        
        if (checksumAsset) {
            const checksumResponse = await fetch(checksumAsset.browser_download_url);
            const checksumText = await checksumResponse.text();
            
            // 解析校验码文件并更新全局checksums对象
            parseAndUpdateChecksums(checksumText);
        }
    } catch (error) {
        console.log('无法获取校验码信息:', error);
    }
}

// 解析校验码文件
function parseAndUpdateChecksums(checksumText) {
    const lines = checksumText.split('\n');
    const newChecksums = {};
    
    lines.forEach(line => {
        const match = line.match(/^([a-f0-9]{64})\s+(.+)$/i);
        if (match) {
            const [, hash, filename] = match;
            const name = filename.toLowerCase();
            
            if (name.includes('windows') && name.endsWith('.exe')) {
                if (!newChecksums.windows) newChecksums.windows = {};
                newChecksums.windows.exe = hash;
            } else if (name.includes('windows') && name.endsWith('.zip')) {
                if (!newChecksums.windows) newChecksums.windows = {};
                newChecksums.windows.zip = hash;
            }
            // 添加其他平台的解析...
        }
    });
    
    // 更新全局checksums对象
    Object.assign(checksums, newChecksums);
}

// 页面加载时检查最新版本
document.addEventListener('DOMContentLoaded', checkLatestVersion);