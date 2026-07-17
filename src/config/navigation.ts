import type { LucideIcon } from 'lucide-react'
import {
	Rocket,
	MonitorSmartphone,
	Users,
	BookOpen,
	Map,
	Package,
	Trophy,
} from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'release' -> t('nav.release')
	path: string // URL 路径，如 '/release'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'release', path: '/release', icon: Rocket, isContentType: true },
	{ key: 'platforms', path: '/platforms', icon: MonitorSmartphone, isContentType: true },
	{ key: 'multiplayer', path: '/multiplayer', icon: Users, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'levels', path: '/levels', icon: Map, isContentType: true },
	{ key: 'items', path: '/items', icon: Package, isContentType: true },
	{ key: 'achievements', path: '/achievements', icon: Trophy, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
)

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
