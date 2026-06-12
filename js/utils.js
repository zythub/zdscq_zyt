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

// 子表默认字段
const SUB_TABLE_FIELDS = [
    { english: 'ay_serial', chinese: '序号', type: 'INT', length: '' },
    { english: 'zb_id', chinese: '主表_id', type: 'VARCHAR', length: '50' }
];

// 生成所有字段
function generateAllFields(selectedNodes, customFieldsList, tableName = "", tableMode = 'main') {
    const allFields = [];
    const usedEnglishNames = new Set();
    
    // 根据模式添加基础字段
    if (tableMode === 'main') {
        // 主表模式：添加基础字段前部分
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
    } else {
        // 子表模式：添加子表默认字段
        for (const field of SUB_TABLE_FIELDS) {
            usedEnglishNames.add(field.english);
            allFields.push({
                'chinese': field.chinese,
                'english': field.english,
                'type': field.type,
                'length': field.length,
                'is_person': false,
                'is_custom': false,
                'source': 'system'
            });
        }
    }
    
    // 处理DATE/TEXT/DATETIME类型长度为空的辅助函数
    function normalizeLength(type, length) {
        if (type === 'DATE' || type === 'TEXT' || type === 'DATETIME') {
            return '';
        }
        return length || '';
    }

    // 2. 添加自定义字段（在基础字段后面）
    // 先收集自定义字段，分为非人员字段和人员字段
    const customNonPersonFields = [];
    const customPersonFields = [];
    
    for (const customField of customFieldsList) {
        const chineseName = (customField.chinese_name || '').trim();
        let englishName = (customField.english_name || '').trim();
        const fieldType = customField.type || 'VARCHAR';
        const fieldLength = customField.length || '50';
        const isPerson = customField.is_person || false;
        const hasDate = customField.has_date || false;
        const hasOpinion = customField.has_opinion || false;
        
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
        
        if (isPerson) {
            // 人员字段：收集起来，后面统一添加（意见 → ID → 姓名 → 日期）
            customPersonFields.push({
                chineseName,
                baseEnglishName,
                fieldType,
                fieldLength,
                hasDate,
                hasOpinion
            });
            if (hasOpinion) {
                usedEnglishNames.add(baseEnglishName + 'yj');
            }
            usedEnglishNames.add(baseEnglishName);
            usedEnglishNames.add(baseEnglishName + '_name');
            if (hasDate && fieldType !== 'DATE' && fieldType !== 'DATETIME') {
                usedEnglishNames.add(baseEnglishName + '_date');
            }
        } else {
            // 非人员字段：直接添加
            usedEnglishNames.add(baseEnglishName);
            customNonPersonFields.push({
                'chinese': chineseName,
                'english': baseEnglishName,
                'type': fieldType,
                'length': normalizeLength(fieldType, fieldLength),
                'is_person': false,
                'is_custom': true,
                'source': 'custom'
            });
            
            // 如果勾选了意见字段，添加意见字段
            if (hasOpinion) {
                const opinionFieldName = baseEnglishName + 'yj';
                usedEnglishNames.add(opinionFieldName);
                customNonPersonFields.push({
                    'chinese': chineseName + '意见',
                    'english': opinionFieldName,
                    'type': 'VARCHAR',
                    'length': '500',
                    'is_person': false,
                    'is_custom': true,
                    'source': 'custom'
                });
            }
            
            // 如果勾选了日期字段且不是DATE类型，添加日期字段
            if (hasDate && fieldType !== 'DATE' && fieldType !== 'DATETIME') {
                const dateFieldName = baseEnglishName + '_date';
                usedEnglishNames.add(dateFieldName);
                customNonPersonFields.push({
                    'chinese': chineseName + '日期',
                    'english': dateFieldName,
                    'type': 'DATE',
                    'length': '',
                    'is_person': false,
                    'is_custom': true,
                    'source': 'custom'
                });
            }
        }
    }
    
    // 先添加非人员自定义字段
    for (const field of customNonPersonFields) {
        allFields.push(field);
    }
    
    // 再添加人员自定义字段（意见 → ID → 姓名 → 日期）
    for (const personField of customPersonFields) {
        // 意见字段
        if (personField.hasOpinion) {
            allFields.push({
                'chinese': personField.chineseName + '意见',
                'english': personField.baseEnglishName + 'yj',
                'type': 'VARCHAR',
                'length': '500',
                'is_person': false,
                'is_custom': true,
                'source': 'custom'
            });
        }
        
        // ID字段
        allFields.push({
            'chinese': personField.chineseName,
            'english': personField.baseEnglishName,
            'type': 'VARCHAR',
            'length': '50',
            'is_person': false,
            'is_custom': true,
            'source': 'custom'
        });
        
        // 姓名字段
        allFields.push({
            'chinese': personField.chineseName + '姓名',
            'english': personField.baseEnglishName + '_name',
            'type': personField.fieldType,
            'length': normalizeLength(personField.fieldType, personField.fieldLength),
            'is_person': true,
            'is_custom': true,
            'source': 'custom'
        });
        
        // 日期字段
        if (personField.hasDate && personField.fieldType !== 'DATE' && personField.fieldType !== 'DATETIME') {
            allFields.push({
                'chinese': personField.chineseName + '日期',
                'english': personField.baseEnglishName + '_date',
                'type': 'DATE',
                'length': '',
                'is_person': false,
                'is_custom': true,
                'source': 'custom'
            });
        }
    }
    
    // 3. 添加选中的审批节点字段（在自定义字段后面）
    // 按节点分组处理，每个节点的非人员字段和人员字段放在一起
    for (const nodeId of selectedNodes) {
        if (APPROVAL_NODES_CONFIG[nodeId]) {
            const node = APPROVAL_NODES_CONFIG[nodeId];
            if (node.fields) {
                // 收集该节点的非人员字段和人员字段
                const nodeNonPersonFields = [];
                const nodePersonFields = [];
                
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
                    
                    if (field.is_person) {
                        // 人员字段：收集起来
                        nodePersonFields.push({
                            chineseName,
                            baseEnglishName,
                            fieldType: field.type,
                            fieldLength: field.length,
                            nodeId
                        });
                        usedEnglishNames.add(baseEnglishName);
                        usedEnglishNames.add(baseEnglishName + '_name');
                    } else {
                        // 非人员字段：收集起来
                        usedEnglishNames.add(baseEnglishName);
                        nodeNonPersonFields.push({
                            'chinese': chineseName,
                            'english': baseEnglishName,
                            'type': field.type,
                            'length': normalizeLength(field.type, field.length),
                            'is_person': false,
                            'is_custom': false,
                            'source': `node_${nodeId}`
                        });
                    }
                }
                
                // 先添加该节点的非人员字段
                for (const field of nodeNonPersonFields) {
                    allFields.push(field);
                }
                
                // 再添加该节点的人员字段（ID → 姓名）
                for (const personField of nodePersonFields) {
                    // ID字段
                    allFields.push({
                        'chinese': personField.chineseName,
                        'english': personField.baseEnglishName,
                        'type': 'VARCHAR',
                        'length': '50',
                        'is_person': false,
                        'is_custom': false,
                        'source': `node_${personField.nodeId}`
                    });
                    
                    // 姓名字段
                    allFields.push({
                        'chinese': personField.chineseName + '姓名',
                        'english': personField.baseEnglishName + '_name',
                        'type': personField.fieldType,
                        'length': normalizeLength(personField.fieldType, personField.fieldLength),
                        'is_person': true,
                        'is_custom': false,
                        'source': `node_${personField.nodeId}`
                    });
                }
            }
        }
    }
    
    // 4. 主表模式下添加基础字段后部分（在节点字段后面）
    if (tableMode === 'main') {
        for (const [engName, chiName] of BASE_FIELDS_END) {
            if (!usedEnglishNames.has(engName)) {
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
        }
    }
    
    return allFields;
}

// 生成Excel文件
function generateExcelFile(tableName, tableChineseName, allFields, downloadName) {
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
        tableChineseName || tableName || '自定义表',
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