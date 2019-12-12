export interface AdminPreOrderRequest {
	additionalInfo?: any	// 解析该字段出错 请联系后台修改格式;
	areaId?: number;
	areaSize?: number;
	buildingNum?: number;
	channel?: string;
	cityId?: number;
	cityName?: string;
	companyName?: string;
	contactEmail?: string;
	contactName?: string;
	contactTel?: string;
	endDate?: string; // example: "2017-10-10"
	managementMode?: string;
	projectPhase?: string;
	provinceId?: number;
}
export interface AliyunAssumedRoleUser {
	arn?: string;
	assumedRoleId?: string;
}
export interface AliyunStsCredentials {
	accessKeyId?: string;
	accessKeySecret?: string;
	expiration?: string;
	securityToken?: string;
}
export interface AliyunStsFeignResponse {
	assumedRoleUser?: undefined;
	credentials?: undefined;
	location?: undefined;
	requestId?: string;
}
export interface AppIconRequest {
	appName?: string;
	url?: string;
}
export interface AppIconResponse {
	appName?: string;
	taskId?: number;
	url?: string;
}
export interface AppTaskStatusResponse {
	androidIsFinished?: boolean;
	androidUrl?: string;
	iosIsFinished?: boolean;
	iosUrl?: string;
}
export interface AppVersion {
	latestVersion?: string;
	needAlert?: boolean;
	type?: 'ANDRIOD_AGENT' | 'IOS_AGENT' | 'ANDRIOD_CREAMS' | 'IOS_CREAMS';
	updateInfo?: string;
}
export interface ApplicationAddRequest {
	contentUrl?: string; // 应用内容
	description?: string; // 简介
	logoUrl?: string; // logoUrl
	name?: string; // 应用名
	redirectUri?: string; // 跳转地址
	slogan?: string; // slogan
	tel?: string; // 电话
	tenant?: string; // 企业
}
export interface ApplicationDTO {
	active?: boolean; // 开启状态
	contentUrl?: string; // 应用内容
	createdById?: number; // 创建人Id
	createdByName?: string; // 创建人名
	createdDate?: string; // 新建日期
	description?: string; // 简介
	id?: number;
	logoUrl?: string; // logoUrl
	name?: string; // 应用名
	redirectUri?: string; // 跳转地址
	slogan?: string; // slogan
	tel?: string; // 电话
	tenant?: string; // 企业
}
export interface ApplicationUpdateRequest {
	active?: boolean; // 开启状态
	contentUrl?: string; // 应用内容
	description?: string; // 简介
	logoUrl?: string; // logoUrl
	name?: string; // 应用名
	redirectUri?: string; // 跳转地址
	slogan?: string; // slogan
	tenant?: string; // 企业
}
export interface AreaModel {
	blocks?: Array<BlockModel>;
	city?: undefined;
	code?: string;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
	province?: undefined;
}
export interface BackstageUserActiveRequest {
	active?: boolean;
}
export interface BackstageUserDetailModel {
	active?: boolean;
	city?: string;
	cityId?: number;
	departmentId?: number;
	departmentName?: string;
	email?: string;
	id?: number;
	name?: string;
	permissions?: Array<string>;
	province?: string;
	provinceId?: number;
	role?: string;
	tel?: string;
}
export interface BackstageUserModel {
	active?: boolean;
	city?: string;
	cityId?: number;
	email?: string;
	id?: number;
	name?: string;
	tel?: string;
}
export interface BackstageUserSummary {
	cityId?: number;
	id?: number;
	name?: string;
}
export interface BannerAddRequest {
	imageUrl?: string; // 图片地址
	name?: string;
}
export interface BannerDTO {
	active?: boolean; // 开启状态
	createdById?: number; // 创建人Id
	createdByName?: string; // 创建人名
	createdDate?: string; // 新建日期
	id?: number;
	imageUrl?: string; // 新建日期
	name?: string;
	queue?: number; // 排序; example: 1
}
export interface BannerUpdateRequest {
	imageUrl?: string; // 图片地址
	name?: string; // Banner名
}
export interface BlockModel {
	area?: undefined;
	city?: undefined;
	code?: string;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
	province?: undefined;
}
export interface BuildingActiveRequest {
	active?: boolean;
}
export interface BuildingCreateRequest {
	address: string; // 详细地址; example: "江陵路567号王道孵化器"
	alertDaysNum: number; // 付款提醒提前天数; example: 25
	areaId: number; // 区域Id; example: 1203
	assetsType: 'CUSTOMER_OWNER' | 'PRINCIPAL_TENANT'; // 资产属性
	buildingType: 'SCIENCE_TECHNOLOGY_PARK' | 'JOINT_OFFICE' | 'COMMERICAL_BUILDING'; // 楼宇类型
	customerId: number; // 客户id
	imageUrl: string; // 图片的Base64编码
	managerIds?: Array<number>; // 协助管理者
	name: string; // 楼盘名称; example: "新东方国际科技中心5F"
	promotionTel: string; // 招商电话; example: 88888888
	sendSmsAuto: boolean; // true, false
	smsAutoDate?: string; // 短信启用时间
}
export interface BuildingDetailStatisticResponse {
	contractCount?: number;
	rentAreaSize?: number;
	roomAreaSize?: number;
	roomCount?: number;
}
export interface BuildingModel {
	active?: boolean; // 启用楼盘
	address: string; // 地址; example: "长安街1号"
	alertDaysNum: number; // 付款提醒提前天数; example: 25
	area?: undefined; // 区
	assetsType?: 'CUSTOMER_OWNER' | 'PRINCIPAL_TENANT'; // 资产属性
	buildingType?: 'SCIENCE_TECHNOLOGY_PARK' | 'JOINT_OFFICE' | 'COMMERICAL_BUILDING'; // 楼宇类型
	calculatePriceTwoPoint: boolean; // 是否按两位小数计算; example: true
	city?: undefined; // 市
	createdDate?: string; // 创建时间
	customerId?: number; // 客户id
	customerName?: string; // 客户姓名
	dayNumberPerYear: number; // 年计租天数; example: 365
	id: number; // 楼盘id; example: 1
	imageUrl: string; // 图片的Base64编码
	managerIds?: Array<number>; // 协助管理者id
	managers?: Array<Manager>; // 协助管理者
	name: string; // 楼盘名称; example: "天安门广场"
	priceUnit: 'M' | 'D'; // 价格单位; example: "M"
	promotionTel?: string; // 招商电话
	province?: undefined; // 省
	rentalFormula: 'DAYS' | 'MONTHS'; // DAYS, MONTHS; example: "付款方式"
	sendSmsAuto: boolean; // true, false
}
export interface BuildingRequest {
	creamsBuildingId: number; // 楼宇id
	creamsBuildingName: string; // 楼宇名称; example: "一号楼"
}
export interface BuildingResponse {
	active?: boolean; // 启用楼盘
	address: string; // 地址; example: "长安街1号"
	alertDaysNum: number; // 付款提醒提前天数; example: 25
	area?: undefined; // 区
	assetsType?: 'CUSTOMER_OWNER' | 'PRINCIPAL_TENANT'; // 资产属性
	buildingType?: 'SCIENCE_TECHNOLOGY_PARK' | 'JOINT_OFFICE' | 'COMMERICAL_BUILDING'; // 楼宇类型
	calculatePriceTwoPoint: boolean; // 是否按两位小数计算; example: true
	city?: undefined; // 市
	createdDate?: string; // 创建时间
	customerId?: number; // 客户id
	customerName?: string; // 客户姓名
	dayNumberPerYear: number; // 年计租天数; example: 365
	id: number; // 楼盘id; example: 1
	imageUrl: string; // 图片的Base64编码
	managerIds?: Array<number>; // 协助管理者id
	managers?: Array<Manager>; // 协助管理者
	name: string; // 楼盘名称; example: "天安门广场"
	priceUnit: 'M' | 'D'; // 价格单位; example: "M"
	promotionTel?: string; // 招商电话
	province?: undefined; // 省
	rentalFormula: 'DAYS' | 'MONTHS'; // DAYS, MONTHS; example: "付款方式"
	sendSmsAuto: boolean; // true, false
}
export interface BuildingStatisticsResponse {
	buildingCount?: number;
	contractCount?: number;
	customerCount?: number;
	rentAreaSize?: number;
	roomAreaSize?: number;
}
export interface BuildingSummaryModel {
	active?: boolean; // 是否启用
	buildingName?: string; // 楼宇名称
	city?: string; // 城市
	createdDate?: string; // 创建时间
	customerId?: string;
	customerName?: string; // 所属主体
	id?: number; // 楼宇id
	rentAreaSize?: number; // 在租面积
	roomAreaSize?: number; // 房源面积
}
export interface CityModel {
	areas?: Array<AreaModel>;
	cityId?: number;
	code?: string;
	defaultCity?: boolean;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
	province?: undefined;
}
export interface ClientCreateRequest {
	authUserId?: number;
	companyName?: string;
	createdName?: string;
	name?: string;
	note?: string;
	redirectUrl?: string;
}
export interface ClientCreateResponse {
	clientId?: string;
	clientSecret?: string;
}
export interface ClientModel {
	active?: boolean;
	clientId?: string;
	companyName?: string;
	createdDate?: string;
	createdName?: string;
	id?: number;
	name?: string;
	note?: string;
	redirectUrl?: string;
}
export interface CollectionResponseBackstageUserModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<BackstageUserModel>;
	totalCount?: number;
}
export interface CollectionResponseBackstageUserSummary {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<BackstageUserSummary>;
	totalCount?: number;
}
export interface CollectionResponseBuildingSummaryModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<BuildingSummaryModel>;
	totalCount?: number;
}
export interface CollectionResponseCityModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<CityModel>;
	totalCount?: number;
}
export interface CollectionResponseCustomerLogModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<CustomerLogModel>;
	totalCount?: number;
}
export interface CollectionResponseCustomerWithIdNameModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<CustomerWithIdNameModel>;
	totalCount?: number;
}
export interface CollectionResponseDataAnalyzeModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<DataAnalyzeModel>;
	totalCount?: number;
}
export interface CollectionResponseDepartmentModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<DepartmentModel>;
	totalCount?: number;
}
export interface CollectionResponseFeedbackResponse {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<FeedbackResponse>;
	totalCount?: number;
}
export interface CollectionResponseFeignCustomerWithMasterUser {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<FeignCustomerWithMasterUser>;
	totalCount?: number;
}
export interface CollectionResponseNewsModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<NewsModel>;
	totalCount?: number;
}
export interface CollectionResponseParkListModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<ParkListModel>;
	totalCount?: number;
}
export interface CollectionResponsePreOrderModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<PreOrderModel>;
	totalCount?: number;
}
export interface CollectionResponseProvinceModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<ProvinceModel>;
	totalCount?: number;
}
export interface CollectionResponsePureAdminStatisticsModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<PureAdminStatisticsModel>;
	totalCount?: number;
}
export interface CollectionResponseRegionsModelTemp {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<RegionsModelTemp>;
	totalCount?: number;
}
export interface CollectionResponseSubAccount {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<SubAccount>;
	totalCount?: number;
}
export interface CollectionResponseSystematicNotificationDTO {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<SystematicNotificationDTO>;
	totalCount?: number;
}
export interface CollectionResponseUserLoginHistoryModel {
	filter?: any	// 解析该字段出错 请联系后台修改格式;
	items?: Array<UserLoginHistoryModel>;
	totalCount?: number;
}
export interface CreateCreamsAdminRequest {
	active?: boolean;
	backstageRoleEnum?: 'MASTER_ADMIN' | 'ADMIN' | 'ORDINARY';
	cityId?: number;
	email?: string;
	name?: string;
	tel?: string;
}
export interface CreateCreamsAdminResponse {
	description?: string;
	email?: string;
	status?: boolean;
	userId?: number;
	userName?: string;
}
export interface CustomerActiveRequest {
	active?: boolean;
	endDate?: string;
}
export interface CustomerAddRequest {
	address?: string; // 业主地址
	company?: string; // 公司名称
	contractEndDate?: string; // 合同结束时间
	contractNo?: string; // 合同编号
	contractStartDate?: string; // 合同开始时间
	customerType?: 'FORMAL' | 'EXPERIENCE'; // 客户类型
	followerId?: number;
	followerName?: string;
	memo?: string;
	name?: string; // 主账号姓名
	signDate?: string; // 合同签定时间
	tel?: string; // 主账号电话
}
export interface CustomerCreateRequest {
	address?: string; // 客户公司地址
	approvalReason?: boolean; // 是否必填审核原因
	areaId?: number; // 区域
	areaSizeLimit?: number; // 可管理面积
	buildingLimit?: number; // 楼盘上限
	carousel?: boolean; // 首页轮播图功能
	contactEmail?: string; // 联系人邮箱
	contactName?: string; // 联系人姓名
	contactTel?: string; // 联系人电话
	contractNo?: string; // 合同编号
	corporateServices?: boolean; // 企业服务功能
	currency?: boolean; // 币种
	customizedPrice?: boolean; // 是否自定义价格
	debiApp?: boolean; // 德必应用
	development?: boolean; // 天眼查-企业发展
	dxyun?: boolean; // 大象慧云
	dxyunAccount?: string; // 大象慧云账号
	endDate?: string; // 有效结束时间
	eventRegistration?: boolean; // 活动报名功能
	followId?: number; // 跟进人
	hasLesseeRole?: boolean; // 是否有承租人的角色
	investmentManagement?: boolean; // 招商管理
	loginRemark?: string; // 登录不合格备注
	matchBill?: boolean; // 是否一键匹配
	meetingRoomReservation?: boolean; // 会议室预定功能
	name?: string; // 客户公司名
	news?: boolean; // 新闻动态功能
	official?: boolean; // 是否为正式客户
	oneKey?: boolean; // 天眼查-企业族谱
	openApi?: boolean; // open-api
	operatingConditions?: boolean; // 天眼查-经营状况
	ownershipStructure?: boolean; // 天眼查-股权结构
	parkingFee?: boolean; // 停车缴费功能
	policyDeclare?: boolean; // 政策服务功能
	priceName?: string; // 基础单价别名
	propertyManagement?: boolean; // 物业管理模块
	propertyService?: boolean; // 物业服务(保修/报事/保洁/投诉)功能
	publicOpinionAnalysis?: boolean; // 天眼查-舆情分析
	rentVerification?: boolean; // 是否有财务确认功能
	riskInfo?: boolean; // 天眼查-风险动态
	scanOpenDoor?: boolean; // 扫码开门功能
	showPriceName?: string; // 展示单价别名
	showPriceUnit?: 'D' | 'M' | 'YY' | 'YM' | 'YD' | 'GD' | 'GM'; // 展示单价单位(customizedPrice = true时，不为空)
	startDate?: string; // 有效开始日期
	tenantTicket?: boolean; // 租客端管理
	tianyancha?: boolean; // 天眼查
	tianyanchaAvailableCount?: number; // 天眼查-可使用次数
	top?: boolean; // 是否置顶集合(creams左边栏)
	type?: 'STATE_OWNED_ENTERPRISE' | 'GOVERNMENT' | 'PRIVATE_ENTERPRISE' | 'FOREIGN_ENTERPRISE'; // 客户性质
	visitorInvitation?: boolean; // 访客邀约功能
}
export interface CustomerDetailModel {
	address?: string; // 地址
	approvalReason?: boolean; // 是否必填审核原因
	area?: string; // 区
	areaId?: number; // 区域id
	areaSizeLimit?: number; // 可建最大面积
	buildingLimit?: number; // 可建最大楼盘数
	carousel?: boolean; // 首页轮播图功能
	city?: string; // 市
	cityId?: number; // 市id,可能存在没有areaId的情况，历史数据问题
	contactEmail?: string; // 联系邮箱
	contactName?: string; // 联系人
	contactTel?: string; // 联系电话
	contractNo?: string; // 合同编号
	corporateServices?: boolean; // 企业服务功能
	createdDate?: string; // 注册时间
	currency?: boolean; // 币种
	customizedPrice?: boolean; // 是否自定义价格
	debiApp?: boolean; // 德必应用
	development?: boolean; // 天眼查-企业发展
	dxyun?: boolean; // 大象慧云
	dxyunAccount?: string; // 大象慧云账号
	endDate?: string; // 有效结束时间
	eventRegistration?: boolean; // 活动报名功能
	followId?: number; // 跟进人id
	followName?: string; // 跟进人
	hasLesseeRole?: boolean; // 是否有承租人的角色
	id?: number; // 大业主id
	investmentManagement?: boolean; // 招商管理
	loginRemark?: string; // 登录不合格原因
	matchBill?: boolean; // 是否一键匹配
	meetingRoomReservation?: boolean; // 会议室预定功能
	name?: string; // 大业主姓名
	news?: boolean; // 新闻动态功能
	official?: boolean; // 是否为正式客户
	oneKey?: boolean; // 天眼查-企业族谱
	openApi?: boolean; // open-api
	operatingConditions?: boolean; // 天眼查-经营状况
	ownershipStructure?: boolean; // 天眼查-股权结构
	parkingFee?: boolean; // 停车缴费功能
	piaojjAccount?: boolean;
	policyDeclare?: boolean; // 政策服务
	priceName?: string; // 基础单价别名
	propertyManagement?: boolean; // 物业管理模块
	propertyService?: boolean; // 物业服务(保修/报事/保洁/投诉)功能
	province?: string; // 省
	publicOpinionAnalysis?: boolean; // 天眼查-舆情分析
	rentVerification?: boolean; // 是否有财务确认功能
	riskInfo?: boolean; // 天眼查-风险动态
	riskstorm?: boolean; // 风报接入
	scanOpenDoor?: boolean; // 扫码开门功能
	showPriceName?: string; // 展示单价别名
	showPriceUnit?: 'D' | 'M' | 'YY' | 'YM' | 'YD' | 'GD' | 'GM'; // 展示单价单位(customizedPrice = true时，不为空)
	startDate?: string; // 有效开始时间
	tenantTicket?: boolean; // 租客端管理
	tianyancha?: boolean; // 天眼查
	tianyanchaAvailableCount?: number; // 天眼查-可使用次数
	tianyanchaInvokeCount?: number; // 天眼查-已使用次数
	tianyanchaLimitAmount?: number; // 天眼查-剩余金额
	top?: boolean; // 是否置顶集合
	type?: 'STATE_OWNED_ENTERPRISE' | 'GOVERNMENT' | 'PRIVATE_ENTERPRISE' | 'FOREIGN_ENTERPRISE'; // 客户性质，web转成对应的string
	visitorInvitation?: boolean; // 访客邀约功能
}
export interface CustomerDetailStatisticsResponse {
	buildingCount?: number;
	contractCount?: number;
	monthLoginCount?: number;
	rentAreaSize?: number;
	roomAreaSize?: number;
	roomCount?: number;
}
export interface CustomerFollowModel {
	cityId?: number;
	cityName?: string;
	follows?: Array<BackstageUserSummary>;
}
export interface CustomerLogModel {
	createdDate?: string;
	id?: number;
	note?: string;
	operatorName?: string;
}
export interface CustomerModel {
	address?: string; // 业主地址
	company?: string; // 公司名称
	contractEndDate?: string; // 合同结束时间
	contractNo?: string; // 合同编号
	contractStartDate?: string; // 合同开始时间
	customerType?: 'FORMAL' | 'EXPERIENCE'; // 客户类型
	followerId?: number;
	followerName?: string;
	id?: number;
	memo?: string;
	name?: string; // 主账号姓名
	projectCount?: number;
	signDate?: string; // 合同签定时间
	tel?: string; // 主账号电话
}
export interface CustomerRequest {
	alias?: string; // 别名; example: "搜办1"
	buildings?: Array<BuildingRequest>;
	creamsCustomerId: number; // 公司Id; example: 1
	managers?: Array<UserModel>;
	merchants?: Array<UserModel>;
	name: string; // 公司名称; example: "搜办"
	reportStatus: boolean; // 是否启用报备
}
export interface CustomerStatisticsResponse {
	totalCustomer?: number;
}
export interface CustomerUpdateRequest {
	address?: string; // 客户公司地址
	approvalReason?: boolean; // 是否必填审核原因
	areaId?: number; // 区域
	areaSizeLimit?: number; // 可管理面积
	buildingLimit?: number; // 楼盘上限
	carousel?: boolean; // 首页轮播图功能
	contactName?: string; // 联系人姓名
	contactTel?: string; // 联系人电话
	contractNo?: string; // 合同编号
	corporateServices?: boolean; // 企业服务功能
	currency?: boolean; // 币种
	customizedPrice?: boolean; // 是否自定义价格
	debiApp?: boolean; // 德必应用
	development?: boolean; // 天眼查-企业发展
	dxyun?: boolean; // 大象慧云
	dxyunAccount?: string; // 大象慧云账号
	endDate?: string; // 有效结束时间
	eventRegistration?: boolean; // 活动报名功能
	followId?: number; // 跟进人
	hasLesseeRole?: boolean; // 是否有承租人的角色
	investmentManagement?: boolean; // 招商管理
	loginRemark?: string; // 登录不合格备注
	matchBill?: boolean; // 是否一键匹配
	meetingRoomReservation?: boolean; // 会议室预定功能
	name?: string; // 客户公司名
	news?: boolean; // 新闻动态功能
	official?: boolean; // 是否为正式客户
	oneKey?: boolean; // 天眼查-企业族谱
	openApi?: boolean; // open-api
	operatingConditions?: boolean; // 天眼查-经营状况
	ownershipStructure?: boolean; // 天眼查-股权结构
	parkingFee?: boolean; // 停车缴费功能
	policyDeclare?: boolean; // 政策服务功能
	priceName?: string; // 基础单价别名
	propertyManagement?: boolean; // 物业管理模块
	propertyService?: boolean; // 物业服务(保修/报事/保洁/投诉)功能
	publicOpinionAnalysis?: boolean; // 天眼查-舆情分析
	rentVerification?: boolean; // 是否有财务确认功能
	riskInfo?: boolean; // 天眼查-风险动态
	riskstorm?: boolean; // 风报接入
	scanOpenDoor?: boolean; // 扫码开门功能
	showPriceName?: string; // 展示单价别名
	showPriceUnit?: 'D' | 'M' | 'YY' | 'YM' | 'YD' | 'GD' | 'GM'; // 展示单价单位(customizedPrice = true时，不为空)
	startDate?: string; // 有效开始日期
	tenantTicket?: boolean; // 租客端管理
	tianyancha?: boolean; // 天眼查
	tianyanchaAvailableCount?: number; // 天眼查-可使用次数
	top?: boolean; // 是否置顶集合(creams左边栏)
	type?: 'STATE_OWNED_ENTERPRISE' | 'GOVERNMENT' | 'PRIVATE_ENTERPRISE' | 'FOREIGN_ENTERPRISE'; // 客户性质
	visitorInvitation?: boolean; // 访客邀约功能
}
export interface CustomerWithIdNameModel {
	id?: number;
	name?: string;
}
export interface DataAnalyzeModel {
	count?: number;
	day?: number;
	month?: number;
	week?: number;
	year?: number;
}
export interface DepartmentCreateRequest {
	name?: string; // 部门名称
	superiorId?: number; // 上级部门id，若不传，则表示新建根部门
}
export interface DepartmentModel {
	child?: Array<DepartmentModel>;
	id?: number; // 部门id
	memberCount?: number; // 部门下所有人员，包括下级部门人员
	name?: string; // 部门名称
	relationIds?: string; // id关系
}
export interface DepartmentUpdateRequest {
	name?: string;
}
export interface DomainRequest {
	customerId?: number;
	subDomainName?: string;
}
export interface DomainResponse {
	domainName?: string;
}
export interface ExportResponse {
	exportUrl?: string;
}
export interface FeedbackRemarkRequest {
	content: string; // 备注
}
export interface FeedbackResponse {
	content?: string; // 报错反馈内容
	createdDate?: string;
	dealed?: boolean; // 是否已处理
	id?: number;
	parkName?: string; // 楼盘名称
	remark?: string; // 备注
	reportUserName?: string; // 报错人名字
	reportUserTel?: string; // 报错人电话
}
export interface FeignCustomerWithMasterUser {
	active?: boolean; // 是否启用
	areaId?: number; // 区域id，历史原因，areaId和cityId可能只存在一个
	areaSizeLimit?: number; // 最大面积
	authUserId?: number; // AuthUserId
	cityName?: string; // 城市
	companyName?: string; // 公司名称
	contactName?: string; // 联系人姓名
	contactTel?: string; // 联系人电话
	createdDate?: string; // 创建时间
	customerId?: number; // 客户id
	endDate?: string; // 到期时间
	followId?: number; // 跟单人id
	followerName?: string; // 跟单人名称
	hasLesseeRole?: boolean; // 是否有承租人的角色
	loginCount?: number; // customer下所有的用户当月的登录次数
	official?: boolean; // 是否为正式客户
	useDate?: string; // 开始使用时间
}
export interface File {
	absolute?: boolean;
	absoluteFile?: undefined;
	absolutePath?: string;
	canonicalFile?: undefined;
	canonicalPath?: string;
	directory?: boolean;
	executable?: boolean;
	file?: boolean;
	freeSpace?: number;
	hidden?: boolean;
	lastModified?: number;
	name?: string;
	parent?: string;
	parentFile?: undefined;
	path?: string;
	readable?: boolean;
	totalSpace?: number;
	usableSpace?: number;
	writable?: boolean;
}
export interface FileInfoApiModel {
	createdBy?: undefined; // 创建人
	createdDate?: string; // 创建时间
	customerId?: number; // 大业主ID
	domainType?: string; // 上传对象类型
	fileName?: string; // 文件名称
	fileSize?: number; // 文件大小
	fileType?: string; // 文件类型
	fileUrl?: string; // 文件地址
	id?: number;
	lastModifiedDate?: string;
	objectId?: number; // 上传对象ID
}
export interface FileInfoApiRequest {
	customerId: number; // 大业主ID
	domainType: string; // domainType
	fileName: string; // 文件名称
	fileSize?: number; // 文件大小
	fileType?: string; // 文件类型
	fileUrl?: string; // 文件地址
	objectId: number; // 上传对象ID
}
export interface FilterResponse {
	areaSizeModels?: Array<RoomFilterShowModel>;
	fitmentModels?: Array<RoomFilterShowModel>;
	priceModels?: Array<RoomFilterPriceModel>;
	regions?: Array<AreaModel>;
}
export interface FloorModel {
	areaSize?: number;
	floor?: string;
	queue?: number;
	roomList?: Array<RoomWithContractModel>;
}
export interface ImageRequest {
	height?: number; // 高度
	imageUrl?: string; // 图片url
	width?: number; // 宽度
}
export type InputStream = any	// 解析该字段出错 请联系后台修改格式
export interface LaunchImages {
	createTime?: string;
	height?: string;
	id?: number;
	pictureName?: string;
	picturePath?: string;
	width?: string;
}
export interface LaunchImagesParams {
	height?: string;
	pictureName?: string;
	picturePath?: string;
	width?: string;
}
export interface LoginWebImage {
	backgroundUrl?: string;
	logoImageUrl?: string;
}
export interface Manager {
	managerId?: number;
	managerName?: string;
}
export interface MobileImageRequest {
	launchImageUrl?: string;
	loginImageUrl?: string;
}
export interface MobileImageResponse {
	launchImageUrl?: string;
	loginImageUrl?: string;
}
export interface NewsModel {
	content: string; // 内容
	createDate: string; // 发布时间
	hot: boolean; // 是否热门
	id: number; // id
	image: string; // 图片
	introduction: string; // 简介
	pushApp: boolean; // 是否推送至经纪人
	pushWeb: boolean; // 是否推送至官网
	recommend: boolean; // 是否推荐
	subtitle: string; // 副标题
	title: string; // 标题
	useful?: boolean;
}
export interface OAuth2AuthenticationErrorResponse {
	error?: string;
	error_description?: string;
}
export interface OAuth2AuthenticationSuccessResponse {
	access_token?: string;
	expires_in?: number;
	jti?: string;
	open_id?: string;
	refresh_token?: string;
	scope?: string;
	token_type?: string;
	union_id?: string;
}
export interface OfficeWeb {
	areaName?: string;
	areaSize?: string;
	city?: string;
	comment?: string;
	commentator?: string;
	createTime?: string;
	id?: number;
	name?: string;
	path?: string;
	type?: 'OFFICE_WEB' | 'OFFICE_CASE';
}
export interface OfficeWebParams {
	areaName?: string;
	areaSize?: string;
	city?: string;
	comment?: string;
	commentator?: string;
	name?: string;
	path?: string;
	type?: 'OFFICE_WEB' | 'OFFICE_CASE';
}
export interface OperationCityRequest {
	additionalCityIds?: Array<number>; // 新增的城市ids
	reducedIds?: Array<number>; // 删除的城市cityId
}
export interface OssFileLocation {
	bucket?: string;
	name?: string;
	path?: string;
	region?: string;
}
export interface PageApplicationDTO {
	content?: Array<ApplicationDTO>;
	empty?: boolean;
	first?: boolean;
	last?: boolean;
	number?: number;
	numberOfElements?: number;
	size?: number;
	sort?: undefined;
	totalElements?: number;
	totalPages?: number;
}
export interface PageBannerDTO {
	content?: Array<BannerDTO>;
	empty?: boolean;
	first?: boolean;
	last?: boolean;
	number?: number;
	numberOfElements?: number;
	size?: number;
	sort?: undefined;
	totalElements?: number;
	totalPages?: number;
}
export interface PageClientModel {
	content?: Array<ClientModel>;
	empty?: boolean;
	first?: boolean;
	last?: boolean;
	number?: number;
	numberOfElements?: number;
	size?: number;
	sort?: undefined;
	totalElements?: number;
	totalPages?: number;
}
export interface PageCustomerModel {
	content?: Array<CustomerModel>;
	empty?: boolean;
	first?: boolean;
	last?: boolean;
	number?: number;
	numberOfElements?: number;
	size?: number;
	sort?: undefined;
	totalElements?: number;
	totalPages?: number;
}
export interface ParentRegionModel {
	code?: string;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
}
export interface ParkBuildingListModel {
	city?: string;
	creamsBuildingId?: number;
	creamsBuildingName?: string;
	creamsCustomerId?: number;
	customerName?: string;
	managerTel?: string;
}
export interface ParkListModel {
	active?: boolean;
	agentName?: string;
	agentTel?: string;
	id?: number;
	images?: Array<ImageRequest>;
	managerName?: string;
	managerTel?: string;
	name?: string;
	region?: undefined;
}
export interface ParkRequest {
	agentName?: string; // 招商人员; example: "小王"
	agentTel?: string; // 招商部电话; example: 12345678901
	areaSize?: number; // 总面积; example: 123.12
	commission?: string; // 佣金; example: "一个月房租"
	commissionDescription?: string; // 结佣说明; example: "客户签约及租金到账三个工作日内结佣"
	customers?: Array<CustomerRequest>;
	description?: string; // 楼盘描述
	id?: number;
	images?: Array<ImageRequest>;
	managerName?: string; // 经服姓名; example: "小李"
	managerTel?: string; // 经服电话; example: 12345678901
	maxPrice?: number; // 最大租金单价; example: 80
	minPrice?: number; // 最小租金单价; example: 60
	name: string; // 楼盘名称; example: "王道公园"
	parkInfo?: string; // 停车位; example: "1500个"
	priceUnit?: 'D' | 'M' | 'YY' | 'YM' | 'YD' | 'GD' | 'GM'; // 租金单位(D:元*㎡/天,M元*㎡/月); example: "D"
	propertyCompany?: string; // 物业公司; example: "XX物业公司"
	propertyPrice?: number; // 物业费; example: 123.12
	propertyPriceUnit?: 'D' | 'M' | 'YY' | 'YM' | 'YD' | 'GD' | 'GM'; // 物业费单位(M:元*㎡/月,YM:元/月); example: "M"
	region?: undefined;
	roomRate?: number; // 得房率; example: 60
}
export interface PasswordModificationRequest {
	newPassword?: string;
	oldPassword?: string;
}
export interface PreOrderModel {
	additionalInfo?: any	// 解析该字段出错 请联系后台修改格式;
	areaId?: number;
	areaName?: string;
	building?: string;
	buildingNum?: number;
	city?: string;
	cityId?: number;
	cityName?: string;
	created?: boolean;
	customerSource?: 'WEB' | 'APP';
	email?: string;
	id?: number;
	name?: string;
	orderDate?: string;
	provinceId?: number;
	provinceName?: string;
	source?: string;
	supplement?: undefined;
	tel?: string;
}
export interface ProjectBosRequest {
	active?: boolean; // 启用状态
	masterManagerName?: string; // 超管姓名
	masterManagerTel?: string; // 超管手机号
	memo?: string;
	name?: string; // 项目名
	priceUnit?: string; // 单纯保存字符, 与 setting.priceUnit 没关系
	projectType?: string; // 项目类型，可选："OFFICE：写字楼"，"PARK：园区"，"COMMERCIAL：商业综合体"
	resourceType?: string; // 资源类型，可选："ROOM：房源"，"CUBICLE：工位"
}
export interface ProjectModel {
	active?: boolean;
	id?: number;
	masterManagerName?: string;
	masterManagerTel?: string;
	memo?: string;
	name?: string;
	priceUnit?: string;
	projectType?: string;
	projectTypeName?: string;
	resourceType?: string;
	resourceTypeName?: string;
}
export interface ProvinceModel {
	cities?: Array<CityModel>;
	code?: string;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
}
export interface PureAdminStatisticsModel {
	count?: number;
	name?: string;
}
export interface RegionBaseModel {
	id?: number;
	name?: string;
}
export interface RegionRequest {
	address?: string; // 详细地址; example: "xxxxx"
	areaId?: number; // 区id; example: 1
	areaName?: string; // 区名称; example: "滨江区"
	blockId?: number; // 商圈id; example: 1
	blockName?: string; // 商圈名称; example: "龙湖天街"
	cityId?: number; // 市id; example: 1
	cityName?: string; // 市名称; example: "杭州市"
	id?: number;
	lat?: number; // 经度
	lng?: number; // 维度
	provinceId?: number; // 省id; example: 1
	provinceName?: string; // 省名称; example: "浙江省"
}
export interface RegionsModelTemp {
	code?: string;
	id?: number;
	latitude?: number;
	longitude?: number;
	name?: string;
	regions?: Array<RegionsModelTemp>;
	type?: number;
}
export interface Resource {
	description?: string;
	file?: undefined;
	filename?: string;
	inputStream?: undefined;
	open?: boolean;
	readable?: boolean;
	uri?: undefined;
	url?: undefined;
}
export interface RiskstormCustomerRequest {
	riskstormApiKey?: string;
	riskstormApiName?: string;
	riskstormEmail?: string;
	riskstormPasscode?: string;
}
export interface RiskstormCustomerResponse {
	id?: number;
	riskstormApiKey?: string;
	riskstormApiName?: string;
	riskstormEmail?: string;
	riskstormPasscode?: string;
}
export interface RoomFilterPriceModel {
	code?: string;
	models?: Array<RoomFilterShowModel>;
}
export interface RoomFilterShowModel {
	code?: string;
	max?: number;
	min?: number;
	name?: string;
}
export interface RoomWithContractModel {
	areaSize?: number;
	queue?: number;
	roomId?: number;
	roomNumber?: string;
}
export interface Sort {
	empty?: boolean;
	sorted?: boolean;
	unsorted?: boolean;
}
export interface SortBannerApiRequest {
	sortBannerRequestList?: Array<SortBannerRequest>;
}
export interface SortBannerRequest {
	id?: number;
	queue?: number;
}
export interface SubAccount {
	email?: string;
	id?: number;
	role?: string;
}
export interface SupplementModel {
	areaSize?: number;
	buildingNum?: number;
	channel?: string;
	dateCreate?: string;
	endDate?: string;
	id?: number;
	managementMode?: string;
	projectPhase?: string;
}
export interface SystematicNotificationDTO {
	content?: string; // 内容; example: "服务计划于今晚9:00 - 明天早上6:00进行停机维护，特此公告。"
	createdDate?: number; // 创建时间; example: "2019-04-02 19:26:08"
	headline?: string; // 标题; example: "停机公告"
	id?: number; // 通知id; example: 1
	status?: 'SENT' | 'UNSENT'; // 消息发送状态，已发送: SEND，未发送: UNSENT; example: "SENT"
	url?: string; // 通告详情地址; example: "https://app.creams.io"
}
export interface SystematicNotificationRequest {
	content?: string; // 内容; example: "服务计划于今晚9:00 - 明天早上6:00进行停机维护，特此公告。"
	headline?: string; // 标题; example: "停机公告"
	id?: number; // 通知id; example: 1
	status?: 'SENT' | 'UNSENT'; // 消息发送状态，已发送: SEND，未发送: UNSENT; example: "SENT"
	url?: string; // 通告详情地址; example: "https://app.creams.io"
}
export interface URI {
	absolute?: boolean;
	authority?: string;
	fragment?: string;
	host?: string;
	opaque?: boolean;
	path?: string;
	port?: number;
	query?: string;
	rawAuthority?: string;
	rawFragment?: string;
	rawPath?: string;
	rawQuery?: string;
	rawSchemeSpecificPart?: string;
	rawUserInfo?: string;
	scheme?: string;
	schemeSpecificPart?: string;
	userInfo?: string;
}
export interface URL {
	authority?: string;
	content?: any	// 解析该字段出错 请联系后台修改格式;
	defaultPort?: number;
	deserializedFields?: undefined;
	file?: string;
	host?: string;
	path?: string;
	port?: number;
	protocol?: string;
	query?: string;
	ref?: string;
	serializedHashCode?: number;
	userInfo?: string;
}
export type URLStreamHandler = any	// 解析该字段出错 请联系后台修改格式
export interface UserAccessTokenModel {
	access_token?: string;
	expires_in?: number;
	jti?: string;
	open_id?: string;
	refresh_token?: string;
	scope?: string;
	token_type?: string;
	union_id?: string;
}
export interface UserCreateRequest {
	cityId?: number; // 城市id
	departmentId?: number; // 部门id
	email?: string; // 邮箱
	name?: string; // 姓名
	permissions?: Array<string>; // 权限
	role?: string; // 角色
	tel?: string; // 电话
}
export interface UserFeignModel {
	id?: number;
	name?: string;
}
export interface UserLoginHistoryModel {
	loginAccount?: string;
	loginDate?: string;
	loginType?: string;
}
export interface UserModel {
	name?: string; // 名字; example: "小明"
	tel?: string; // 手机号; example: 1234567890
}
export interface UserUpdateRequest {
	cityId?: number; // 城市id
	departmentId?: number; // 部门id
	name?: string; // 姓名
	permissions?: Array<string>; // 权限
	role?: string; // 角色
	tel?: string; // 电话
}
export interface WebImageRequest {
	detailImageUrl?: string;
	listImageUrl?: string;
}
export interface WebImageResponse {
	detailImageUrl?: string;
	listImageUrl?: string;
}