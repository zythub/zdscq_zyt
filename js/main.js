// 存储自定义字段
let customFields = [];

// 页面加载完成后初始化
document.addEventListener("DOMContentLoaded", function () {
  loadApprovalNodes();

  // 监听人员字段复选框变化
  document
    .getElementById("customIsPerson")
    .addEventListener("change", function () {
      if (this.checked) {
        document.getElementById("customHasDate").checked = true;
      }
    });

  // 自动翻译中文字段名
  document
    .getElementById("customChineseName")
    .addEventListener("input", function () {
      const chineseName = this.value.trim();
      if (chineseName) {
        // 前端翻译
        const englishName = translateField(chineseName);
        if (englishName) {
          document.getElementById("customEnglishName").value = englishName;

          // 自动判断是否为人员字段
          const personKeywords = [
            "人",
            "员",
            "工程师",
            "经理",
            "负责人",
            "经办",
            "总监",
            "主管",
            "领导",
            "专工",
          ];
          const isPersonField = personKeywords.some((keyword) =>
            chineseName.includes(keyword),
          );
          document.getElementById("customIsPerson").checked = isPersonField;

          // 如果是人员字段，自动勾选日期字段
          if (isPersonField) {
            document.getElementById("customHasDate").checked = true;
          }
        }
      }
    });

  // 自动填充示例自定义字段
  setTimeout(() => {
    document.getElementById("customChineseName").value = "审批人";
    document
      .getElementById("customChineseName")
      .dispatchEvent(new Event("input"));
  }, 500);
});

// 初始化审批节点卡片
function initializeNodeCards() {
  const nodeCards = document.querySelectorAll(".approval-node-card");
  nodeCards.forEach((card) => {
    const checkbox = card.querySelector(".node-checkbox");
    checkbox.addEventListener("change", function () {
      if (this.checked) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
      previewFields();
    });
  });
}

// 加载审批节点
function loadApprovalNodes() {
  const approvalNodesGrid = document.getElementById("approvalNodes");
  approvalNodesGrid.innerHTML = "";

  const nodes = APPROVAL_NODES_CONFIG;
  for (const [nodeId, nodeData] of Object.entries(nodes)) {
    // 提取字段描述
    const fieldDescriptions = nodeData.fields
      .filter(
        (field) => !field.name.includes("id") && !field.name.includes("ID"),
      )
      .map((f) => f.name.replace("日期", "").replace("意见", ""))
      .filter((value, index, self) => self.indexOf(value) === index)
      .slice(0, 2);

    const descriptionText =
      fieldDescriptions.join("、") + (fieldDescriptions.length > 0 ? "等" : "");

    // 创建节点卡片
    const card = document.createElement("div");
    card.className = "approval-node-card";
    card.onclick = () => toggleNodeSelection(nodeId);

    card.innerHTML = `
            <div class="node-header">
                <input type="checkbox" class="node-checkbox" id="node_${nodeId}" value="${nodeId}">
                <label for="node_${nodeId}" class="node-title">${nodeId}</label>
            </div>
            <div class="node-info">${descriptionText}</div>
        `;

    approvalNodesGrid.appendChild(card);
  }

  // 初始化节点卡片事件
  initializeNodeCards();
}

// 切换节点选择
function toggleNodeSelection(nodeId) {
  const checkbox = document.querySelector(`#node_${nodeId}`);
  if (checkbox) {
    checkbox.checked = !checkbox.checked;
    checkbox.dispatchEvent(new Event("change"));
  }
}

// 获取选中的节点
function getSelectedNodes() {
  const checkboxes = document.querySelectorAll(".node-checkbox:checked");
  return Array.from(checkboxes).map((cb) => cb.value);
}

// 添加自定义字段
function addCustomField() {
  const chineseName = document.getElementById("customChineseName").value.trim();
  const englishName = document.getElementById("customEnglishName").value.trim();
  const fieldType = document.getElementById("customFieldType").value;
  const fieldLength = document.getElementById("customFieldLength").value.trim();
  const isPerson = document.getElementById("customIsPerson").checked;
  const hasDate = document.getElementById("customHasDate").checked;

  if (!chineseName) {
    alert("请输入中文字段名");
    return;
  }

  if (!englishName) {
    alert("请输入或等待自动生成英文字段名");
    return;
  }

  // 如果字段类型已经是日期，就不能再添加日期字段
  if (hasDate && (fieldType === "DATE" || fieldType === "DATETIME")) {
    alert("字段类型已经是日期类型，无需再添加日期字段");
    return;
  }

  // 创建字段对象
  const fieldId = "field_" + Date.now();
  const field = {
    id: fieldId,
    chinese_name: chineseName,
    english_name: englishName,
    type: fieldType,
    length: fieldLength,
    is_person: isPerson,
    has_date: hasDate,
  };

  // 添加到数组
  customFields.push(field);

  // 隐藏空状态提示
  document.getElementById("emptyCustomFields").style.display = "none";

  // 创建字段显示项
  const fieldItem = document.createElement("div");
  fieldItem.className = "custom-field-item";
  fieldItem.id = "customField_" + fieldId;

  // 显示字段标签
  let badges = `<span class="badge">${fieldType}(${fieldLength})</span>`;
  if (isPerson) {
    badges += '<span class="badge badge-warning">人员</span>';
  }
  if (hasDate) {
    badges += '<span class="badge badge-primary">日期</span>';
  }

  fieldItem.innerHTML = `
        <div class="custom-field-info">
            <div class="custom-field-chinese" title="${chineseName}">${chineseName}</div>
            <div class="custom-field-english" title="${englishName}">${englishName}</div>
            <div class="custom-field-meta">
                ${badges}
            </div>
        </div>
        <button class="btn-remove" onclick="removeCustomField('${fieldId}')">
            <i class="fas fa-times"></i>
        </button>
    `;

  document.getElementById("customFieldsList").appendChild(fieldItem);

  // 清空表单
  document.getElementById("customChineseName").value = "";
  document.getElementById("customEnglishName").value = "";
  document.getElementById("customFieldLength").value = "50";
  document.getElementById("customIsPerson").checked = false;
  document.getElementById("customHasDate").checked = false;

  // 自动预览
  setTimeout(previewFields, 100);
}

// 移除自定义字段
function removeCustomField(fieldId) {
  customFields = customFields.filter((field) => field.id !== fieldId);
  const element = document.getElementById("customField_" + fieldId);
  if (element) {
    element.remove();
  }

  // 如果没有任何自定义字段，显示空状态提示
  if (customFields.length === 0) {
    document.getElementById("emptyCustomFields").style.display = "flex";
  }

  previewFields();
}

// 预览字段
// 在 main.js 中修改 previewFields 函数
function previewFields() {
    const selectedNodes = getSelectedNodes();
    const tableName = document.getElementById('tableNameInput').value || '未命名表';
    
    // 显示加载状态 - 保持与最终相同的列数
    const previewBody = document.getElementById('previewTableBody');
    previewBody.innerHTML = `
        <tr>
            <td colspan="5" style="text-align: center; padding: 60px;">
                <div style="color: #3498db;">
                    <i class="fas fa-spinner fa-spin fa-2x"></i>
                    <p style="margin-top: 15px; font-size: 14px;">正在生成预览...</p>
                </div>
            </td>
        </tr>
    `;
    
    // 使用setTimeout模拟异步处理
    setTimeout(() => {
        try {
            // 生成所有字段
            const allFields = generateAllFields(selectedNodes, customFields, tableName);
            updatePreviewTable(allFields);
            updateStats(allFields);
            
            // 如果有字段，显示成功消息
            if (allFields.length > 0) {
                showNotification(`已生成 ${allFields.length} 个字段`, 'success');
            }
        } catch (error) {
            console.error('预览失败:', error);
            previewBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 60px; color: #e74c3c;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p style="margin-top: 15px; font-size: 14px;">预览失败，请重试</p>
                    </td>
                </tr>
            `;
            showNotification('预览失败: ' + error.message, 'error');
        }
    }, 300);
}

// 更新预览表格
function updatePreviewTable(fields) {
    const tbody = document.getElementById('previewTableBody');
    tbody.innerHTML = '';
    
    if (fields.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 40px; color: #999;">
                    <div style="font-size: 14px;">
                        <i class="fas fa-table" style="font-size: 28px; opacity: 0.5;"></i>
                        <p style="margin-top: 12px;">暂无字段数据</p>
                        <p style="font-size: 13px; margin-top: 6px;">请选择审批节点或添加自定义字段</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    fields.forEach((field, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td style="text-align: center;">${index + 1}</td>
            <td title="${field.chinese}">${field.chinese}</td>
            <td style="font-family: 'Consolas', 'Monaco', monospace;" title="${field.english}">${field.english}</td>
            <td>
                <span class="type-badge">${field.type}</span>
            </td>
            <td style="text-align: center;">${field.length || '-'}</td>
        `;
        
        tbody.appendChild(row);
    });
}
// 更新统计信息
function updateStats(fields) {
    const idFields = fields.filter(f => f.source.endsWith('_id')).length;
    const dateFields = fields.filter(f => f.source.endsWith('_date')).length;
    const personFields = fields.filter(f => f.is_person).length;
    const totalFields = fields.length;
    
    // 更新底部统计
    document.getElementById('statTotal').textContent = totalFields;
    document.getElementById('statId').textContent = idFields;
    document.getElementById('statDate').textContent = dateFields;
    
    // 显示统计面板
    document.getElementById('statsPanel').style.display = 'flex';
}
// 生成Excel文件
function generateExcel() {
  const selectedNodes = getSelectedNodes();
  const tableName =
    document.getElementById("tableNameInput").value || "自定义表";
  const downloadName = document.getElementById("downloadName").value.trim();

  if (selectedNodes.length === 0 && customFields.length === 0) {
    alert("请至少选择一个审批节点或添加一个自定义字段");
    return;
  }

  // 检查是否加载了SheetJS库
  if (typeof XLSX === "undefined") {
    showNotification("错误：Excel生成库未加载，请检查网络连接", "error");
    return;
  }

  // 显示加载状态
  const originalText = document.querySelector(".btn-success").innerHTML;
  document.querySelector(".btn-success").innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> 生成中...';
  document.querySelector(".btn-success").disabled = true;

  try {
    // 生成所有字段
    const allFields = generateAllFields(selectedNodes, customFields, tableName);

    // 生成Excel文件并下载
    const fileName = generateExcelFile(tableName, allFields, downloadName);

    // 显示成功消息
    showNotification(`Excel文件生成成功：${fileName}`, "success");
  } catch (error) {
    console.error("生成失败:", error);
    showNotification("生成失败：" + error.message, "error");
  } finally {
    // 恢复按钮状态
    document.querySelector(".btn-success").innerHTML = originalText;
    document.querySelector(".btn-success").disabled = false;
  }
}

// 显示通知
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        background: ${type === "success" ? "#2ecc71" : "#e74c3c"};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i>
        <span style="margin-left: 8px;">${message}</span>
    `;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}
