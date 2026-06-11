// 增强版中文转拼音字典
const PINYIN_DICTIONARY = {
    // 常用字
    '经': 'jing', '理': 'li', '人': 'ren', '员': 'yuan', '工': 'gong', '程': 'cheng',
    '师': 'shi', '部': 'bu', '主': 'zhu', '任': 'ren', '领': 'ling', '导': 'dao',
    '意': 'yi', '见': 'jian', '日': 'ri', '期': 'qi', '时': 'shi', '间': 'jian',
    '项': 'xiang', '目': 'mu', '专': 'zhuan', '业': 'ye', '监': 'jian', '设': 'she',
    '备': 'bei', '保': 'bao', '管': 'guan', '负': 'fu', '责': 'ze', '物': 'wu',
    '资': 'zi', '安': 'an', '质': 'zhi', '划': 'hua', '机': 'ji', '构': 'gou',
    '施': 'shi', '单': 'dan', '位': 'wei', '建': 'jian', '设': 'she', '分': 'fen',
    '管': 'guan', '总': 'zong', '副': 'fu', '工': 'gong', '程': 'cheng', '签': 'qian',
    '章': 'zhang', '文': 'wen', '件': 'jian', '状': 'zhuang', '态': 'tai', '流': 'liu',
    '程': 'cheng', '实': 'shi', '例': 'li', '编': 'bian', '号': 'hao', '业': 'ye',
    '务': 'wu', '开': 'kai', '始': 'shi', '专': 'zhuan', '业': 'ye', '机': 'ji',
    '组': 'zu', '合': 'he', '同': 'tong', '名': 'ming', '称': 'cheng', '组': 'zu',
    '织': 'zhi', '代': 'dai', '表': 'biao', '点': 'dian', '地': 'di', '材': 'cai',
    '料': 'liao', '构': 'gou', '配': 'pei', '件': 'jian', '公': 'gong', '司': 'si',
    '章': 'zhang', '盖': 'gai', '字': 'zi', '年': 'nian', '月': 'yue', '注': 'zhu',
    '致': 'zhi', '附': 'fu', '时': 'shi', '名': 'ming', '类': 'lei', '型': 'xing',
    '状': 'zhuang', '态': 'tai', '备': 'bei', '注': 'zhu', '附': 'fu', '件': 'jian',
    '自': 'zi', '检': 'jian', '资': 'zi', '料': 'liao', '我': 'wo', '方': 'fang',
    '已': 'yi', '完': 'wan', '成': 'cheng', '审': 'shen', '批': 'pi', '上': 'shang',
    '报': 'bao', '手': 'shou', '续': 'xu', '内': 'nei', '部': 'bu', '工': 'gong',
    '作': 'zuo', '中': 'zhong', '心': 'xin', '办': 'ban', '室': 'shi', '验': 'yan',
    '收': 'shou', '创': 'chuang', '优': 'you', '质': 'zhi', '达': 'da', '标': 'biao',
    '编': 'bian', '制': 'zhi', '参': 'can', '考': 'kao', '依': 'yi', '据': 'ju',
    
    // 特殊词汇
    '审批': 'approval', '上报': 'report', '手续': 'procedure', '内部': 'internal',
    '完成': 'completed', '自检': 'self_check', '资料': 'data', '附件': 'attachment',
    '备注': 'remark', '状态': 'status', '类型': 'type', '名称': 'name',
    '时间': 'time', '日期': 'date', '意见': 'opinion'
};

// 常用词映射表
const COMMON_TRANSLATIONS = {
    // 基础字段
    "专业": "specialty",
    "机组": "unit",
    "工程名称": "project_name",
    "编号": "number",
    "单位名称": "organization_name",
    "合同编号": "contract_number",
    "合同名称": "contract_name",
    "签章文件id": "fdd_dzqz_file_id",
    "签章状态": "fdd_dzqz_status",
    "流程实例ID": "flow_instance_id",
    "流程编号": "flow_id",
    "流程状态": "flow_startflag",
    "流程业务状态": "flow_bizstate",
    
    // 施工单位相关
    "经办人": "operator",
    "施工单位经办人": "construction_operator",
    "项目经理": "project_manager",
    "施工单位项目经理": "construction_manager",
    "日期": "date",
    "施工单位经办人id": "construction_operator_id",
    "施工单位项目经理id": "construction_manager_id",
    
    // 设备代保管单位相关
    "设备代保管单位负责人": "custody_person_in_charge",
    "设备代保管单位负责人id": "custody_person_in_charge_id",
    "设备代保管单位意见": "custody_opinion",
    "设备代保管单位id": "custody_unit_id",
    "设备代保管单位日期": "custody_date",
    
    // 监理相关
    "项目监理机构意见": "supervision_opinion",
    "专业监理工程师": "specialized_supervision_engineer",
    "专业监理工程师id": "specialized_supervision_engineer_id",
    "总监理工程师": "chief_supervision_engineer",
    "总监理工程师id": "chief_supervision_engineer_id",
    "监理日期": "supervision_date",
    
    // 建设单位相关
    "建设单位意见": "construction_unit_opinion",
    "分管领导": "division_leader",
    "分管领导id": "division_leader_id",
    "分管领导日期": "division_leader_date",
    
    // 工程部
    "建设单位工程部意见": "engineering_department_opinion",
    "工程部专业工程师": "engineering_department_engineer",
    "工程部专业工程师id": "engineering_department_engineer_id",
    "工程部主任": "engineering_department_director",
    "工程部主任id": "engineering_department_director_id",
    "工程部日期": "engineering_department_date",
    
    // 计划部
    "建设单位计划部意见": "planning_department_opinion",
    "计划部专业工程师": "planning_department_engineer",
    "计划部专业工程师id": "planning_department_engineer_id",
    "计划部主任": "planning_department_director",
    "计划部主任id": "planning_department_director_id",
    "计划部日期": "planning_department_date",
    
    // 物资部
    "建设单位物资部意见": "material_department_opinion",
    "物资部专业工程师": "material_department_engineer",
    "物资部专业工程师id": "material_department_engineer_id",
    "物资部主任": "material_department_director",
    "物资部主任id": "material_department_director_id",
    "物资部日期": "material_department_date",
    
    // 安质部
    "建设单位安质部意见": "safety_quality_department_opinion",
    "安质部专业工程师": "safety_quality_department_engineer",
    "安质部专业工程师id": "safety_quality_department_engineer_id",
    "安质部主任": "safety_quality_department_director",
    "安质部主任id": "safety_quality_department_director_id",
    "安质部日期": "safety_quality_department_date",
    
    // 通用后缀
    "id": "id",
    "ID": "id",
    "日期": "date",
    "时间": "time",
    "意见": "opinion",
    "备注": "remark",
    "状态": "status",
    "名称": "name",
    "编号": "number"
};

// 排除字段
const EXCLUDED_FIELDS = ["注",  "附", "："];