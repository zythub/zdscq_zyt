// 审批节点配置
const APPROVAL_NODES_CONFIG = {
    "施工单位": {
        "fields": [
            { "name": "经办人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "项目经理", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "经办人日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "监理单位": {
        "fields": [
            { "name": "项目监理机构审查意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "专业监理工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "总监理工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "监理日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "设计单位": {
        "fields": [
            { "name": "设计单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "设计代表", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "设计单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "造价咨询单位": {
        "fields": [
            { "name": "造价咨询单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "造价咨询单位负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "造价咨询单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "工程部": {
        "fields": [
            { "name": "工程部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "工程部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "工程部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "工程部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "安健环部": {
        "fields": [
            { "name": "安健环部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "安健环部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "安健环部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "安健环部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "计划经营部": {
        "fields": [
            { "name": "计划经营部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "计划经营部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "建设单位": {
        "fields": [
            { "name": "建设单位审批意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "建设单位代表", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "建设单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "建设单位职能部门": {
        "fields": [
            { "name": "建设单位职能部门审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "职能部门专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "职能部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "职能部门日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "档案部": {
        "fields": [
            { "name": "档案部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "档案部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "档案部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "档案部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "物资部": {
        "fields": [
            { "name": "建设单位物资部意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "物资部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "物资部主任", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "物资部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "设备代保管单位": {
        "fields": [
            { "name": "设备代保管单位负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "设备代保管单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "设备代保管单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
        "代保管单位": {
        "fields": [
            { "name": "代保管单位负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "代保管单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "代保管单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    }
};

// 默认选中的节点
const DEFAULT_SELECTED_NODES = ["建设单位职能部门", "设计单位"];

// 基础字段（前部分）
const BASE_FIELDS = [
    ["specialty", "专业"],
    ["unit", "机组"],
    ["project_name", "工程名称"],
    ["number", "编号"],
    ["bdh", "表单号"],
    ["zhi", "致"],
    ["qcdw", "起草单位"],
    ["organization_name", "单位名称"],
    ["company_code", "单位代码"],
    ["contract_name", "合同名称"],
    ["contract_number", "合同编号"]
];


// 基础字段（后部分，放在节点字段后面）
const BASE_FIELDS_END = [
    ["fdd_dzqz_file_id", "签章文件id"],
    ["fdd_dzqz_status", "签章状态"],
    ["flow_instance_id", "流程实例ID"],
    ["flow_id", "流程编号"],
    ["flow_startflag", "流程状态"],
    ["flow_bizstate", "流程业务状态"],
];

// 翻译字典
const TRANSLATION_DICT = {
    // 基础字段
    "专业": "specialty",
    "机组": "unit",
    "工程名称": "project_name",
    "编号": "number",
    "单位名称": "organization_name",
    "合同编号": "contract_number",
    "合同名称": "contract_name",
    "签章文件id": "fdd_dzqz_file_id",
    "签署文件id": "fdd_dzqz_file_id",
    "签章状态": "fdd_dzqz_status",
    "流程实例ID": "flow_instance_id",
    "流程编号": "flow_id",
    "流程状态": "flow_startflag",
    "流程业务状态": "flow_bizstate",

    // 施工单位相关
    "经办人": "operator",
    "项目经理": "project_manager",
    "经办人日期": "date",
    "年": "year",
    "月": "month",
    "日": "day",

    // 监理相关
    "项目监理机构审查意见": "jl_opinion",
    "专业监理工程师": "jl_vice_engineer",
    "总监理工程师": "jl_total_engineer",
    "监理日期": "jl_date",

    // 建设单位相关
    "建设单位审批意见": "construction_unit_opinion",
    "建设单位代表": "construction_unit_representative",
    "建设单位日期": "construction_unit_date",
    "建设单位职能部门审核意见": "jsdwzjwry_opinion",
    "职能部门专业工程师": "jsdwzjwry_engineer",
    "职能部门负责人": "jsdwzjwry_leader",
    "职能部门日期": "jsdwzjwry_date",

    // 设计单位相关
    "设计单位意见": "sjdw_opinion",
    "设计代表": "sjdw_representative",
    "设计单位日期": "sjdw_date",

    // 造价单位相关
    "造价咨询单位意见": "zjzx_opinion",
    "造价咨询单位负责人": "zjzx_leader",
    "造价咨询单位日期": "zjzx_date",

    // 工程部相关
    "工程部审核意见": "gcb_opinion",
    "工程部专业工程师": "gcb_engineer",
    "工程部部门负责人": "gcb_leader",
    "工程部日期": "gcb_date",

    // 计划经营部相关
    "计划经营部审核意见": "jhjy_opinion",
    "计划经营部专业工程师": "jhjy_engineer",
    "计划经营部部门负责人": "jhjy_leader",
    "计划经营部日期": "jhjy_date",

    // 物资部相关
    "建设单位物资部意见": "wzb_opinion",
    "物资部专业工程师": "wzb_engineer",
    "物资部主任": "wzb_leader",
    "物资部日期": "wzb_date",

    // 安健环部相关
    "安健环部审核意见": "ajh_opinion",
    "安健环部专业工程师": "ajh_engineer",
    "安健环部部门负责人": "ajh_leader",
    "安健环部日期": "ajh_date",

    // 设备代保管单位相关
    "设备代保管单位负责人": "sbdb_leader",
    "设备代保管单位意见": "sbdb_opinion",
    "设备代保管单位日期": "sbdb_date",

    // 通用字段
    "意见": "opinion",
    "备注": "remark",
    "附件": "attachment",

    // ID字段翻译
    "id": "id"
};

// 排除字段
const EXCLUDED_FIELDS = ["注", "致", "附", "："];
