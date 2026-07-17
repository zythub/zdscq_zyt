// 审批节点配置
const APPROVAL_NODES_CONFIG = {
    "施工单位": {
        "fields": [
            { "name": "经办人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "项目技术负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "项目经理", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "经办人日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "监理单位": {
        "fields": [
            { "name": "项目监理机构审查意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "专业监理工程师意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "专业监理工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "安全监理工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "总监理工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "监理日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "设计单位": {
        "fields": [
            { "name": "设计单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "设计代表", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "设计单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "造价咨询单位": {
        "fields": [
            { "name": "造价咨询单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "专业造价工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "造价咨询单位负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "造价咨询单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "工程部": {
        "fields": [
            { "name": "工程部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "工程部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "工程部部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "工程部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "安质部": {
        "fields": [
            { "name": "安质部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "安质部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "安质部部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "安质部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "安健环部": {
        "fields": [
            { "name": "安健环部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "安健环部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "安健环部部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "安健环部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "计划部": {
        "fields": [
            { "name": "计划部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "计划部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "计划部部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "计划部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "建设单位": {
        "fields": [
            { "name": "建设单位审批意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "建设单位代表", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "建设单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "建设单位职能部门": {
        "fields": [
            { "name": "建设单位职能部门审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "职能部门专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "职能部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "职能部门日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "档案部": {
        "fields": [
            { "name": "档案部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "档案部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "档案部部门负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "档案部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "物资部": {
        "fields": [
            { "name": "建设单位物资部意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "物资部专业工程师", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "物资部主任", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "物资部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "设备代保管单位": {
        "fields": [
            { "name": "设备代保管单位负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "设备代保管单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "设备代保管单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
        "代保管单位": {
        "fields": [
            { "name": "代保管单位负责人", "is_person": true, "type": "VARCHAR", "length": "800" },
            { "name": "代保管单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "代保管单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    }
};

// 默认选中的节点
const DEFAULT_SELECTED_NODES = [ "施工单位"];

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
const TRANSLATION_DICT = {};

// 排除字段
const EXCLUDED_FIELDS = ["注", "致", "附", "："];
