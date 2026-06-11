// 审批节点配置
const APPROVAL_NODES_CONFIG = {
    "施工单位": {
        "fields": [
            { "name": "经办人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "经办人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "项目经理", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "项目经理id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "监理单位": {
        "fields": [
            { "name": "项目监理机构审查意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "专业监理工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "专业监理工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "总监理工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "总监理工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "监理日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "建设单位": {
        "fields": [
            { "name": "建设单位审批意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "建设单位代表", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "建设单位代表id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "建设单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "造价咨询单位": {
        "fields": [
            { "name": "造价咨询单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "造价咨询单位负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "造价咨询单位负责人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "造价咨询单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "工程部": {
        "fields": [
            { "name": "工程部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "工程部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "工程部专业工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "工程部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "工程部部门负责人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "工程部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "计划经营部": {
        "fields": [
            { "name": "计划经营部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "计划经营部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部专业工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部部门负责人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "计划经营部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "物资部": {
        "fields": [
            { "name": "建设单位物资部意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "物资部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "物资部专业工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "物资部主任", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "物资部主任id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "物资部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "安建环部": {
        "fields": [
            { "name": "安建环部审核意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "安建环部专业工程师", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "安建环部专业工程师id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "安建环部部门负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "安建环部部门负责人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "安建环部日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    },
    "设备代保管单位": {
        "fields": [
            { "name": "设备代保管单位负责人", "is_person": true, "type": "VARCHAR", "length": "50" },
            { "name": "设备代保管单位负责人id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "设备代保管单位意见", "is_person": false, "type": "VARCHAR", "length": "500" },
            { "name": "设备代保管单位id", "is_person": false, "type": "VARCHAR", "length": "50" },
            { "name": "设备代保管单位日期", "is_person": false, "type": "DATE", "length": "" }
        ]
    }
};

// 基础字段
const BASE_FIELDS = [
    ["specialty", "专业"],
    ["unit", "机组"],
    ["project_name", "工程名称"],
    ["number", "编号"],
    ["bdh", "表单号"],
    ["zhi", "致"],
    ["organization_name", "单位名称"],
    ["contract_number", "合同编号"],
    ["contract_name", "合同名称"],
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

    // 工程相关
    "工程编号": "gcbh",
    "编码": "code",
    "单位名称id": "unit_name_id",
    "合同id": "contract_id",
    "合同代码": "contract_code",
    "计划日期": "plan_date",
    "计划地点": "plan_area",
    "设备/材料/构配件": "equipment_materials_components",

    // 施工单位相关
    "施工项目部": "construction_department",
    "施工项目部盖章": "sg_signet_pic",
    "施工单位章": "sg_signet_pic",
    "施工单位盖章": "sg_signet_pic",
    "经办人": "operator",
    "施工单位经办人": "sg_operator",
    "项目经理": "project_manager",
    "施工单位项目经理": "sg_manager",
    "日期": "date",
    "年": "year",
    "月": "month",
    "日": "day",
    "施工单位经办人id": "sg_operator_id",
    "施工单位项目经理id": "sg_manager_id",

    // 设备代保管单位相关
    "设备代保管单位意见_需要": "sbdbg_view_agree",
    "设备代保管单位意见_不需要": "sbdbg_view_disagree",
    "设备代保管单位章": "sbdbg_signet_pic",
    "设备代保管单位盖章": "sbdbg_signet_pic",
    "设备代保管单位负责人签字": "sbdbg_head_pic",
    "设备代保管单位负责人": "sbdbg_head",
    "设备代保管单位日期": "sbdbg_date",
    "设备代保管单位意见": "sbdbg_view",
    "设备代保管单位id": "sbdbg_view_id",
    "设备代保管单位负责人id": "sbdbg_head_id",

    // 监理相关
    "项目监理机构审查意见": "jl_opinion",
    "监理意见": "jl_opinion",
    "项目监理机构": "supervision_institution",
    "项目监理机构盖章": "jl_signet",
    "项目监理部章": "jl_signet",
    "专业监理工程师签字": "jl_vice_engineer_signature",
    "专业监理工程师": "jl_vice_engineer",
    "总监理工程师签字": "jl_total_engineer_signature",
    "总监理工程师": "jl_total_engineer",
    "总副总监理工程师": "jl_total_engineer",
    "总/副总监理工程师": "jl_total_engineer",
    "监理日期": "jl_date",
    "监理机构日期": "jl_date",
    "专业监理工程师id": "jl_vice_engineer_id",
    "总监理工程师id": "jl_total_engineer_id",

    // 建设单位相关
    "建设单位工程部": "construction_unit_engineering",
    "工程部专业工程师": "engineering_department_engineer",
    "工程部专业工程师id": "engineering_department_engineer_id",
    "工程部主任": "engineering_department_director",
    "工程部主任id": "engineering_department_director_id",
    "工程部日期": "engineering_department_date",
    "建设单位工程部意见": "projectpeng_opinion",
    "建设单位安质部": "construction_unit_safety_quality",
    "安质部专业工程师": "safety_quality_engineer",
    "安质部专业工程师id": "safety_quality_engineer_id",
    "安质部主任": "safety_quality_director",
    "安质部主任id": "safety_quality_director_id",
    "安质部日期": "safety_quality_date",
    "建设单位": "construction_unit",
    "分管领导": "division_leader",
    "分管领导id": "division_leader_id",
    "分管领导日期": "division_leader_date",
    "建设单位计划部": "construction_unit_planning",
    "计划部专业工程师": "planning_department_engineer",
    "计划部专业工程师id": "planning_department_engineer_id",
    "计划部主任": "planning_department_director",
    "计划部主任id": "planning_department_director_id",
    "计划部日期": "planning_department_date",
    // 计划经营部相关
    "计划经营部审核意见": "planning_department_opinion",
    
    // 造价单位相关
    "造价咨询单位意见": "cost_unit_opinion",
    "造价负责人": "cost_unit_leader",
    "造价负责人id": "cost_unit_leader_id",
    "造价日期": "cost_unit_date",
    "物资部专业工程师": "material_department_engineer",
    "物资部专业工程师id": "material_department_engineer_id",
    "物资部主任": "material_department_director",
    "物资部主任id": "material_department_director_id",
    "物资部日期": "material_department_date",

    // 达标/创优质工程办公室相关
    "达标创优质工程办公室": "quality_office",
    "达标/创优质工程办公室": "quality_office",
    "验收组负责人": "acceptance_leader",
    "达标创优质工程办公室负责人": "quality_office_leader",
    "达标/创优质工程办公室负责人": "quality_office_leader",

    // 其他
    "单位代码": "company_code",
    "编制": "weave",
    "建设单位工程部意见": "projectpeng_opinion",
    "工程部专工": "projectpeng_name",
    "工程部主任": "projectpeng_director_name",
    "验收组": "acceptance_group",
    "注": "remark",

    // 通用字段
    "时间": "time",
    "名称": "name",
    "类型": "type",
    "状态": "status",
    "意见": "opinion",
    "备注": "remark_",
    "附件": "attachment",
    "自检资料": "self_inspection_data",

    // 新增自定义可能字段
    "我方已完成": "we_completed",
    "审批": "approval",
    "上报": "report",
    "手续": "procedures",
    "内部审批": "internal_approval",

    // ID字段翻译
    "id": "id",
    "经办人id": "operator_id",
    "项目经理id": "project_manager_id",
    "设备代保管单位负责人id": "sbdbg_head_id",
    "专业监理工程师id": "jl_vice_engineer_id",
    "总监理工程师id": "jl_total_engineer_id",
};

// 排除字段
const EXCLUDED_FIELDS = ["注", "致", "附", "："];