import type { ComponentType } from 'react';
import {
	LuActivity,
	LuBadgeCheck,
	LuBox,
	LuBoxes,
	LuCpu,
	LuDroplet,
	LuFileText,
	LuFlame,
	LuGauge,
	LuGraduationCap,
	LuLayers,
	LuPenTool,
	LuPlug,
	LuRocket,
	LuRuler,
	LuScan,
	LuThermometer,
	LuWaves,
	LuWind,
} from 'react-icons/lu';

export type IconType = ComponentType<{ size?: number; className?: string }>;

export type MenuTone = {
	accent: string;
	glow: string;
	chip: string;
	ring: string;
	text: string;
};

export const MENU_TONES: MenuTone[] = [
	{ accent: '#f59e0b', glow: 'rgba(234,193,23,0.24)', chip: 'rgba(234,193,23,0.14)', ring: 'rgba(234,193,23,0.5)', text: '#fcd34d' },
	{ accent: '#3b82f6', glow: 'rgba(59,130,246,0.24)', chip: 'rgba(59,130,246,0.14)', ring: 'rgba(59,130,246,0.5)', text: '#93c5fd' },
	{ accent: '#10b981', glow: 'rgba(16,185,129,0.24)', chip: 'rgba(16,185,129,0.14)', ring: 'rgba(16,185,129,0.5)', text: '#6ee7b7' },
	{ accent: '#8b5cf6', glow: 'rgba(139,92,246,0.24)', chip: 'rgba(139,92,246,0.14)', ring: 'rgba(139,92,246,0.5)', text: '#c4b5fd' },
];

/* aligned to servicesByCategory order: Design, Analysis, Rapid Prototyping, CAD Training */
export const CATEGORY_META: Array<{ icon: IconType; tagline: string }> = [
	{ icon: LuPenTool, tagline: 'Concept to production-ready design' },
	{ icon: LuGauge, tagline: 'Validate before you build' },
	{ icon: LuBoxes, tagline: 'Prototype and produce faster' },
	{ icon: LuGraduationCap, tagline: 'Industry-ready CAD skills' },
];

export const SERVICE_META: Record<
	string,
	{ icon: IconType; blurb: string; popular?: boolean }
> = {
	'product-development': { icon: LuRocket, blurb: 'Concept to production-ready products', popular: true },
	'industrial-design': { icon: LuPenTool, blurb: 'Form, ergonomics, and feasibility' },
	'electro-mechanical-integration': { icon: LuPlug, blurb: 'Mechanical + electronics packaging' },
	'embedded-systems': { icon: LuCpu, blurb: 'Enclosures for embedded hardware' },
	'reverse-engineering': { icon: LuScan, blurb: 'Recreate and improve components' },
	'3d-cad-modeling': { icon: LuBox, blurb: 'Accurate manufacturing-ready models', popular: true },
	'sheet-metal-design': { icon: LuLayers, blurb: 'Fabrication-ready sheet metal' },
	'drafting-documentation': { icon: LuFileText, blurb: 'Drawings, GD&T, and BOMs' },
	'product-analysis': { icon: LuActivity, blurb: 'Assess performance and risk' },
	'design-validation': { icon: LuBadgeCheck, blurb: 'Verify readiness before tooling' },
	'cae-cfd': { icon: LuWaves, blurb: 'Simulation-backed decisions' },
	'thermal-analysis': { icon: LuThermometer, blurb: 'Thermal performance planning' },
	fdm: { icon: LuBoxes, blurb: 'Fast, durable thermoplastic prints', popular: true },
	sla: { icon: LuDroplet, blurb: 'High-detail resin prototypes' },
	slm: { icon: LuFlame, blurb: 'High-strength metal parts' },
	'training-cad': { icon: LuBox, blurb: 'Professional CAD modules', popular: true },
	'training-gdt': { icon: LuRuler, blurb: 'Geometric tolerancing mastery' },
	'training-cae': { icon: LuActivity, blurb: 'Simulation-driven analysis' },
	'training-cfd': { icon: LuWind, blurb: 'Fluid and thermal analysis' },
};

export const CAD_BADGES = ['SolidWorks', 'Siemens NX', 'CATIA', 'AutoCAD'];
