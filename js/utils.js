// 拼音转换工具函数
function toPinyinAcronym(chineseText) {
    if (!chineseText || !chineseText.trim()) {
        return "";
    }
    
    // 清理文本
    let text = chineseText.trim()
        .replace(/\s+/g, '')
        .replace(/[:：，。；！？、]/g, '');
    
    try {
        // 使用 pinyin-pro 库获取首字母
        if (typeof window.pinyinPro !== 'undefined' && window.pinyinPro.pinyin) {
            const result = window.pinyinPro.pinyin(text, { 
                pattern: 'first',  // 使用 initial 模式获取声母
                toneType: 'none'     // 不带声调
            });
            
            // 去掉空格并转为小写
            if (result) {
                return result.replace(/\s+/g, '').toLowerCase();
            }
        }
        return simpleFallback(text);
    } catch (error) {
        console.error('拼音转换错误:', error);
        return simpleFallback(text);
    }
}

// 简单备用方案
function simpleFallback(text) {
    return text.toLowerCase()
        .replace(/[^a-z0-9]/g, '_')
        .replace(/_+/g, '_')
        .replace(/^_|_$/g, '');
}

// 翻译字段名 - 使用拼音首字母
function translateField(chineseField) {
    // 清理字段
    let field = chineseField.trim()
        .replace(/\s+/g, '')
        .replace(/[:：]/g, '');
    
    // 排除指定字段
    if (EXCLUDED_FIELDS.includes(field)) {
        return null;
    }
    
    // 直接使用拼音首字母生成简短字段名
    return toPinyinAcronym(field);
}

// 生成所有字段
function generateAllFields(selectedNodes, customFieldsList, tableName = "") {
    const allFields = [];
    const usedEnglishNames = new Set();
    
    // 1. 添加基础字段
    for (const [engName, chiName] of BASE_FIELDS) {
        usedEnglishNames.add(engName);
        allFields.push({
            'chinese': chiName,
            'english': engName,
            'type': 'VARCHAR',
            'length': '50',
            'is_person': false,
            'is_custom': false,
            'source': 'system'
        });
    }
    
    // 2. 添加选中的审批节点字段
    for (const nodeId of selectedNodes) {
        if (APPROVAL_NODES_CONFIG[nodeId]) {
            const node = APPROVAL_NODES_CONFIG[nodeId];
            if (node.fields) {
                for (const field of node.fields) {
                    const chineseName = field.name;
                    
                    // 跳过 id 字段（人员字段会自动生成）
                    if (chineseName.includes('id') || chineseName.includes('ID')) {
                        continue;
                    }
                    
                    let englishName = translateField(chineseName);
                    
                    // 如果翻译失败（返回null），跳过这个字段
                    if (englishName === null) {
                        continue;
                    }
                    
                    // 处理重复字段名
                    let baseEnglishName = englishName;
                    if (usedEnglishNames.has(englishName)) {
                        let suffix = 1;
                        while (usedEnglishNames.has(`${englishName}_${suffix}`)) {
                            suffix++;
                        }
                        baseEnglishName = `${englishName}_${suffix}`;
                    }
                    
                    // 人员字段：先生成 ID 字段（不加后缀），再生成姓名字段
                    if (field.is_person) {
                        usedEnglishNames.add(baseEnglishName);
                        allFields.push({
                            'chinese': chineseName,
                            'english': baseEnglishName,
                            'type': 'VARCHAR',
                            'length': '50',
                            'is_person': false,
                            'is_custom': false,
                            'source': `node_${nodeId}`
                        });
                        
                        // 再生成姓名字段（加 _name 后缀）
                        const nameFieldName = baseEnglishName + '_name';
                        usedEnglishNames.add(nameFieldName);
                        allFields.push({
                            'chinese': chineseName + '姓名',
                            'english': nameFieldName,
                            'type': field.type,
                            'length': field.length,
                            'is_person': field.is_person,
                            'is_custom': false,
                            'source': `node_${nodeId}`
                        });
                    } else {
                        // 非人员字段：直接添加
                        usedEnglishNames.add(baseEnglishName);
                        allFields.push({
                            'chinese': chineseName,
                            'english': baseEnglishName,
                            'type': field.type,
                            'length': field.length,
                            'is_person': field.is_person,
                            'is_custom': false,
                            'source': `node_${nodeId}`
                        });
                    }
                }
            }
        }
    }
    
    // 3. 添加自定义字段
    for (const customField of customFieldsList) {
        const chineseName = (customField.chinese_name || '').trim();
        let englishName = (customField.english_name || '').trim();
        const fieldType = customField.type || 'VARCHAR';
        const fieldLength = customField.length || '50';
        const isPerson = customField.is_person || false;
        const hasDate = customField.has_date || false;
        
        if (!chineseName) {
            continue;
        }
        
        // 如果没有提供英文名，自动生成
        if (!englishName) {
            englishName = translateField(chineseName);
            if (englishName === null) {
                continue;
            }
        }
        
        // 处理重复字段名
        let baseEnglishName = englishName;
        if (usedEnglishNames.has(englishName)) {
            let suffix = 1;
            while (usedEnglishNames.has(`${englishName}_${suffix}`)) {
                suffix++;
            }
            baseEnglishName = `${englishName}_${suffix}`;
        }
        
        // 人员字段：先生成 ID 字段（不加后缀），再生成姓名字段
        if (isPerson) {
            usedEnglishNames.add(baseEnglishName);
            allFields.push({
                'chinese': chineseName,
                'english': baseEnglishName,
                'type': 'VARCHAR',
                'length': '50',
                'is_person': false,
                'is_custom': true,
                'source': 'custom_id'
            });
            
            // 再生成姓名字段（加 _name 后缀）
            const nameFieldName = baseEnglishName + '_name';
            usedEnglishNames.add(nameFieldName);
            allFields.push({
                'chinese': chineseName + '姓名',
                'english': nameFieldName,
                'type': fieldType,
                'length': fieldLength,
                'is_person': isPerson,
                'is_custom': true,
                'source': 'custom'
            });
        } else {
            // 非人员字段：直接添加
            usedEnglishNames.add(baseEnglishName);
            allFields.push({
                'chinese': chineseName,
                'english': baseEnglishName,
                'type': fieldType,
                'length': fieldLength,
                'is_person': isPerson,
                'is_custom': true,
                'source': 'custom'
            });
        }
        
        // 如果需要日期字段，添加对应的_date字段
        if (hasDate && !['DATE', 'DATETIME'].includes(fieldType)) {
            let dateFieldName = baseEnglishName + "_date";
            
            // 如果主字段名被修改了，使用修改后的名字
            if (englishName !== baseEnglishName) {
                const suffix = englishName.replace(baseEnglishName, '').replace(/^_/, '');
                if (suffix) {
                    dateFieldName = `${baseEnglishName}_${suffix}_date`;
                }
            }
            
            if (usedEnglishNames.has(dateFieldName)) {
                let suffix = 1;
                while (usedEnglishNames.has(`${baseEnglishName}_${suffix}_date`)) {
                    suffix++;
                }
                dateFieldName = `${baseEnglishName}_${suffix}_date`;
            }
            
            usedEnglishNames.add(dateFieldName);
            
            allFields.push({
                'chinese': chineseName + "日期",
                'english': dateFieldName,
                'type': 'DATE',
                'length': '',
                'is_person': false,
                'is_custom': true,
                'source': 'custom_date'
            });
        }
    }
    
    return allFields;
}

// 生成Excel文件
function generateExcelFile(tableName, allFields, downloadName) {
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    
    // 1. 表名称工作表
    const tableData = [[
        '表名称',
        '中文名称',
        '数据链接名称',
        '备注'
    ], [
        `tud_${toPinyinAcronym(tableName) || 'custom_table'}`,
        tableName || '自定义表',
        '',
        ''
    ]];
    
    const tableWs = XLSX.utils.aoa_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, tableWs, '表名称');
    
    // 2. 字段信息工作表
    const fieldData = [
        ['顺序号', '字段名称', '中文名称', '字段类型', '字段长度', '小数位数', '是否允许null', '默认值', '备注']
    ];
    
    allFields.forEach((field, index) => {
        fieldData.push([
            index + 1,
            field.english,
            field.chinese,
            field.type,
            field.length,
            '',
            'YES',
            '',
            ''
        ]);
    });
    
    const fieldWs = XLSX.utils.aoa_to_sheet(fieldData);
    XLSX.utils.book_append_sheet(wb, fieldWs, '字段信息');
    
    // 设置列宽
    const tableColWidths = [
        { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 }
    ];
    tableWs['!cols'] = tableColWidths;
    
    const fieldColWidths = [
        { wch: 10 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
        { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 20 }
    ];
    fieldWs['!cols'] = fieldColWidths;
    
    // 生成文件名
    const fileName = `${downloadName || tableName || '字段定义'}.xlsx`;
    
    // 生成Excel文件并下载
    XLSX.writeFile(wb, fileName);
    
    return fileName;
}