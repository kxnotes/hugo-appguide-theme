// 校验和数据（示例数据，实际应该从 API 获取）
const checksums = {
    'windows': {
        'exe': 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456',
        'zip': 'b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567a'
    },
    'macos-universal': {
        'dmg': 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2',
        'pkg': 'c3d4e5f6789012345678901234567890abcdef1234567890abcdef1234567ab3'
    },
    'android': {
        'apk': 'e5f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4'
    },
    'linux': {
        'appimage': 'f6789012345678901234567890abcdef1234567890abcdef1234567ab2c3d4e5'
    },
    'ios': {
        'ipa': 'a1b2c3d4e5f6789012345678901234567890abcdef1234567890abcdef123456'
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
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
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
    }, type === 'error' ? 4000 : 2000);
}

// 显示错误通知
function showErrorNotification(message) {
    showToast(message, 'error');
}

// 获取最新的稳定版本（非预发布版本）
async function getLatestStableRelease() {
    try {
        // 获取所有发布版本（前20个应该足够了）
        const response = await fetch('https://api.github.com/repos/hiddify/hiddify-next/releases?per_page=20');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const releases = await response.json();
        
        // 查找第一个非预发布、非草稿的版本
        const stableRelease = releases.find(release => 
            !release.prerelease && 
            !release.draft
        );
        
        if (!stableRelease) {
            throw new Error('未找到稳定版本');
        }
        
        console.log('找到最新稳定版本:', stableRelease.tag_name);
        return stableRelease;
        
    } catch (error) {
        console.error('获取稳定版本失败:', error);
        throw error;
    }
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
        console.log('正在获取最新版本信息...');
        
        // 首先获取最新版本
        const latestResponse = await fetch('https://api.github.com/repos/hiddify/hiddify-next/releases/latest');
        
        if (!latestResponse.ok) {
            throw new Error(`HTTP ${latestResponse.status}: ${latestResponse.statusText}`);
        }
        
        const latestData = await latestResponse.json();
        console.log('GitHub API返回的最新版本:', latestData.tag_name, '预发布:', latestData.prerelease);
        
        let releaseData = latestData;
        
        // 如果最新版本是预发布版本，获取最新的正式版本
        if (latestData.prerelease) {
            console.log('检测到预发布版本，正在查找最新的正式版本...');
            releaseData = await getLatestStableRelease();
        }
        
        console.log('使用版本信息:', releaseData.tag_name);
        
        // 更新版本信息
        updateVersionInfo(releaseData);
        
        // 更新下载链接
        updateDownloadLinks(releaseData.assets);
        
        // 获取并更新SHA256值（如果可用）
        await updateSHA256Checksums(releaseData.assets);
        
        console.log('版本信息更新完成');
        
    } catch (error) {
        console.error('无法获取最新版本信息:', error);
        // 显示友好的错误提示
        showErrorNotification('无法获取最新版本信息，请稍后刷新页面重试');
    }
}

// 更新版本和日期信息
function updateVersionInfo(releaseData) {
    // 更新版本徽章（排除iOS）
    // 优先查找有特定类名的版本元素
    const versionElements = document.querySelectorAll('.version-badge, [data-version], span.bg-blue-100, span.bg-green-100');
    
    if (versionElements.length > 0) {
        versionElements.forEach(element => {
            // 检查是否是版本号且不是iOS
            if (element.textContent.match(/v?\d+\.\d+\.\d+/) && 
                !element.closest('*')?.textContent.includes('iOS')) {
                element.textContent = releaseData.tag_name;
            }
        });
    } else {
        // 备用方案：查找所有span中包含版本号格式的元素
        const allSpans = document.querySelectorAll('span');
        allSpans.forEach(span => {
            const text = span.textContent.trim();
            // 匹配版本号格式 (v2.0.5, 2.0.5等)
            if (text.match(/^v?\d+\.\d+\.\d+$/) && 
                !span.closest('*')?.textContent.includes('iOS')) {
                span.textContent = releaseData.tag_name;
            }
        });
    }
    
    // 更新发布日期
    const releaseDate = new Date(releaseData.published_at).toLocaleDateString('zh-CN');
    
    // 查找日期元素
    const dateSelectors = [
        '[data-release-date]',
        '.release-date', 
        '.text-gray-600'
    ];
    
    dateSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            // 检查是否包含日期格式
            if (element.textContent.match(/\d{4}[-\/]\d{1,2}[-\/]\d{1,2}/)) {
                element.textContent = releaseDate;
            }
        });
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
        } else if (name.includes('macos')) {
            if (name.endsWith('.dmg')) {
                assetMap['macos-dmg'] = asset.browser_download_url;
            } else if (name.endsWith('.pkg')) {
                assetMap['macos-pkg'] = asset.browser_download_url;
            }
        } else if (name.includes('android') && name.endsWith('.apk')) {
            assetMap['android'] = asset.browser_download_url;
        } else if (name.includes('linux') && name.endsWith('.appimage')) {
            assetMap['linux'] = asset.browser_download_url;
        } else if (name.includes('ios') && name.endsWith('.ipa')) {
            assetMap['ios'] = asset.browser_download_url;
        }
    });
    
    // 更新页面上的下载链接
    document.querySelectorAll('a[href*="releases/latest"]').forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes('.exe') && assetMap['windows-exe']) {
            link.href = assetMap['windows-exe'];
        } else if (text.includes('.zip') && assetMap['windows-zip']) {
            link.href = assetMap['windows-zip'];
        } else if (text.includes('.dmg') && assetMap['macos-dmg']) {
            link.href = assetMap['macos-dmg'];
        } else if (text.includes('.pkg') && assetMap['macos-pkg']) {
            link.href = assetMap['macos-pkg'];
        } else if (text.includes('.apk') && assetMap['android']) {
            link.href = assetMap['android'];
        } else if (text.includes('.appimage') && assetMap['linux']) {
            link.href = assetMap['linux'];
        } else if (text.includes('.ipa') && assetMap['ios']) {
            link.href = assetMap['ios'];
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
            } else if (name.includes('macos')) {
                if (!newChecksums['macos-universal']) newChecksums['macos-universal'] = {};
                if (name.endsWith('.dmg')) {
                    newChecksums['macos-universal'].dmg = hash;
                } else if (name.endsWith('.pkg')) {
                    newChecksums['macos-universal'].pkg = hash;
                }
            } else if (name.includes('android') && name.endsWith('.apk')) {
                if (!newChecksums.android) newChecksums.android = {};
                newChecksums.android.apk = hash;
            } else if (name.includes('linux') && name.endsWith('.appimage')) {
                if (!newChecksums.linux) newChecksums.linux = {};
                newChecksums.linux.appimage = hash;
            } else if (name.includes('ios') && name.endsWith('.ipa')) {
                if (!newChecksums.ios) newChecksums.ios = {};
                newChecksums.ios.ipa = hash;
            }
        }
    });
    
    // 更新全局checksums对象
    Object.assign(checksums, newChecksums);
}

// 页面加载时检查最新版本
document.addEventListener('DOMContentLoaded', checkLatestVersion);