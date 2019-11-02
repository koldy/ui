import {
	title as AppTitle,
	slug as AppSlug,
	json as AppJson,
	Documentation as AppDocumentation
} from './components/App/App.docs';

import {
	title as AutoCompleteTitle,
	slug as AutoCompleteSlug,
	json as AutoCompleteJson,
	Documentation as AutoCompleteDocumentation
} from './components/AutoComplete/AutoComplete.docs';

import {
	title as BadgeTitle,
	slug as BadgeSlug,
	json as BadgeJson,
	Documentation as BadgeDocumentation
} from './components/Badge/Badge.docs';

import {
	title as BoxTitle,
	slug as BoxSlug,
	json as BoxJson,
	Documentation as BoxDocumentation
} from './components/Box/Box.docs';

import {
	title as ButtonTitle,
	slug as ButtonSlug,
	json as ButtonJson,
	Documentation as ButtonDocumentation
} from './components/Button/Button.docs';

import {
	title as CheckboxTitle,
	slug as CheckboxSlug,
	json as CheckboxJson,
	Documentation as CheckboxDocumentation
} from './components/Checkbox/Checkbox.docs';

import {
	title as ColorsTitle,
	slug as ColorsSlug,
	json as ColorsJson,
	Documentation as ColorsDocumentation
} from '../docs/Colors.docs';

import {
	title as DrawerTitle,
	slug as DrawerSlug,
	json as DrawerJson,
	Documentation as DrawerDocumentation
} from './components/Drawer/Drawer.docs';

import {
	title as FileFieldTitle,
	slug as FileFieldSlug,
	json as FileFieldJson,
	Documentation as FileFieldDocumentation
} from './components/FileField/FileField.docs';

import {
	title as FlexboxTitle,
	slug as FlexboxSlug,
	json as FlexboxJson,
	Documentation as FlexboxDocumentation
} from './components/Flexbox/Flexbox.docs';

import {
	title as GettingStartedTitle,
	slug as GettingStartedSlug,
	json as GettingStartedJson,
	Documentation as GettingStartedDocumentation
} from '../docs/GettingStarted.docs';

import {
	title as GlobalRulesForPropsTitle,
	slug as GlobalRulesForPropsSlug,
	json as GlobalRulesForPropsJson,
	Documentation as GlobalRulesForPropsDocumentation
} from '../docs/GlobalRulesForProps.docs';

import {
	title as MenuTitle,
	slug as MenuSlug,
	json as MenuJson,
	Documentation as MenuDocumentation
} from './components/Menu/Menu.docs';

import {
	title as MiniCalendarTitle,
	slug as MiniCalendarSlug,
	json as MiniCalendarJson,
	Documentation as MiniCalendarDocumentation
} from './components/DatePicker/DatePicker.docs';

import {
	title as OverlayTitle,
	slug as OverlaySlug,
	json as OverlayJson,
	Documentation as OverlayDocumentation
} from './components/Overlay/Overlay.docs';

import {
	title as RadioTitle,
	slug as RadioSlug,
	json as RadioJson,
	Documentation as RadioDocumentation
} from './components/Radio/Radio.docs';

import {
	title as SelectTitle,
	slug as SelectSlug,
	json as SelectJson,
	Documentation as SelectDocumentation
} from './components/Select/Select.docs';

import {
	title as TableTitle,
	slug as TableSlug,
	json as TableJson,
	Documentation as TableDocumentation
} from './components/Table/Table.docs';

import {
	title as TextAreaTitle,
	slug as TextAreaSlug,
	json as TextAreaJson,
	Documentation as TextAreaDocumentation
} from './components/TextArea/TextArea.docs';

import {
	title as TextFieldTitle,
	slug as TextFieldSlug,
	json as TextFieldJson,
	Documentation as TextFieldDocumentation
} from './components/TextField/TextField.docs';

import {
	title as TextTitle,
	slug as TextSlug,
	json as TextJson,
	Documentation as TextDocumentation
} from './components/Text/Text.docs';

import {
	title as TimeFieldTitle,
	slug as TimeFieldSlug,
	json as TimeFieldJson,
	Documentation as TimeFieldDocumentation
} from './components/TimeField/TimeField.docs';

import {
	title as ToastTitle,
	slug as ToastSlug,
	json as ToastJson,
	Documentation as ToastDocumentation
} from './components/Toast/Toast.docs';

const DOCUMENTATION = 'documentation';
const COMPONENT = 'component';
const INPUT_COMPONENT = 'input-component';

export const components = [
	{
		title: GettingStartedTitle,
		slug: GettingStartedSlug,
		json: GettingStartedJson,
		Documentation: GettingStartedDocumentation,
		group: DOCUMENTATION
	},
	{
		title: ColorsTitle,
		slug: ColorsSlug,
		json: ColorsJson,
		Documentation: ColorsDocumentation,
		group: DOCUMENTATION
	},
	{
		title: GlobalRulesForPropsTitle,
		slug: GlobalRulesForPropsSlug,
		json: GlobalRulesForPropsJson,
		Documentation: GlobalRulesForPropsDocumentation,
		group: DOCUMENTATION
	},
	{
		title: AppTitle,
		slug: AppSlug,
		json: AppJson,
		Documentation: AppDocumentation,
		group: COMPONENT
	},
	{
		title: AutoCompleteTitle,
		slug: AutoCompleteSlug,
		json: AutoCompleteJson,
		Documentation: AutoCompleteDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: BadgeTitle,
		slug: BadgeSlug,
		json: BadgeJson,
		Documentation: BadgeDocumentation,
		group: COMPONENT
	},
	{
		title: BoxTitle,
		slug: BoxSlug,
		json: BoxJson,
		Documentation: BoxDocumentation,
		group: COMPONENT
	},
	{
		title: ButtonTitle,
		slug: ButtonSlug,
		json: ButtonJson,
		Documentation: ButtonDocumentation,
		group: COMPONENT
	},
	{
		title: CheckboxTitle,
		slug: CheckboxSlug,
		json: CheckboxJson,
		Documentation: CheckboxDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: DrawerTitle,
		slug: DrawerSlug,
		json: DrawerJson,
		Documentation: DrawerDocumentation,
		group: COMPONENT
	},
	{
		title: FileFieldTitle,
		slug: FileFieldSlug,
		json: FileFieldJson,
		Documentation: FileFieldDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: FlexboxTitle,
		slug: FlexboxSlug,
		json: FlexboxJson,
		Documentation: FlexboxDocumentation,
		group: COMPONENT
	},
	{
		title: MenuTitle,
		slug: MenuSlug,
		json: MenuJson,
		Documentation: MenuDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: MiniCalendarTitle,
		slug: MiniCalendarSlug,
		json: MiniCalendarJson,
		Documentation: MiniCalendarDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: OverlayTitle,
		slug: OverlaySlug,
		json: OverlayJson,
		Documentation: OverlayDocumentation,
		group: COMPONENT
	},
	{
		title: RadioTitle,
		slug: RadioSlug,
		json: RadioJson,
		Documentation: RadioDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: SelectTitle,
		slug: SelectSlug,
		json: SelectJson,
		Documentation: SelectDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: TableTitle,
		slug: TableSlug,
		json: TableJson,
		Documentation: TableDocumentation,
		group: COMPONENT
	},
	{
		title: TextAreaTitle,
		slug: TextAreaSlug,
		json: TextAreaJson,
		Documentation: TextAreaDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: TextFieldTitle,
		slug: TextFieldSlug,
		json: TextFieldJson,
		Documentation: TextFieldDocumentation,
		group: INPUT_COMPONENT
	},
	{
		title: TextTitle,
		slug: TextSlug,
		json: TextJson,
		Documentation: TextDocumentation,
		group: COMPONENT
	},
	{
		title: ToastTitle,
		slug: ToastSlug,
		json: ToastJson,
		Documentation: ToastDocumentation,
		group: COMPONENT
	},
	{
		title: TimeFieldTitle,
		slug: TimeFieldSlug,
		json: TimeFieldJson,
		Documentation: TimeFieldDocumentation,
		group: INPUT_COMPONENT
	}
];
