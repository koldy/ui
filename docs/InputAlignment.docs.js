import React, {useContext} from 'react';

import DocsTitle from './components/DocsTitle';
import DocsText from './components/DocsText';
import DocsSubTitle from './components/DocsSubTitle';
import DocsCode from './components/DocsCode';
import TextField from '../src/components/TextField/TextField';
import Button from '../src/components/Button/Button';
import ThemeContext from '../src/theme/ThemeContext';
import Select from '../src/components/Select/Select';
import FileField from '../src/components/FileField/FileField';
import Menu from '../src/components/Menu/Menu';
import TimeField from '../src/components/TimeField/TimeField';
import DatePicker from '../src/components/DatePicker/DatePicker';
import Checkbox from '../src/components/Checkbox/Checkbox';
import Radio from '../src/components/Radio/Radio';

export const title = 'Components alignment';
export const slug = 'input-components-alignment';
export const json = null;

export const Documentation = function() {
	const {theme} = useContext(ThemeContext);

	const sizes = theme.json('inputField.size');

	return (
		<>
			<DocsTitle hash="colors">Input components alignment</DocsTitle>
			<DocsText>
				This page is just to visually test the input components alignment when placed in the same line. Various
				combinations will be used in order to check the alignment.
			</DocsText>
			<DocsText>
				All examples are wrapped in a div that tells all its children to have <code>vertical-align:middle</code>.
			</DocsText>
			<DocsSubTitle hash="textfield-textfield-button">TextField + TextField + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField defaultValue="1st" size={size} />
						<TextField defaultValue="2nd" size={size} />
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="textfield-filefield-button">TextField + FileField + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField defaultValue="1st" size={size} />
						<FileField size={size} />
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="textfield-filefield-with-better-example-button">
				TextField + FileField (better example) + Button
			</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField defaultValue="1st" size={size} />
						<FileField size={size}>
							<FileField.Input />
							<FileField.Box m={-2}>
								{({focusField}) => (
									<Button size={size} onClick={focusField}>
										Select file
									</Button>
								)}
							</FileField.Box>
						</FileField>
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="textfield-select-button">TextField + Select + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField defaultValue="1st" size={size} />
						<Select size={size}>
							<option>2nd</option>
							<option>3rd</option>
							<option>4th</option>
						</Select>
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="textfield-menu-button">TextField + Menu + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField defaultValue="1st" size={size} />
						<Menu size={size} inline>
							<Menu.Item inline>first</Menu.Item>
							<Menu.Item inline>second</Menu.Item>
						</Menu>
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="select-timefield-select-button">Select + TimeField + Select + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<Select size={size}>
							<option>2nd</option>
							<option>3rd</option>
							<option>4th</option>
						</Select>
						<TimeField size={size} width="auto" />
						<Select size={size}>
							<option>2nd</option>
							<option>3rd</option>
							<option>4th</option>
						</Select>
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="datepicker-datepicker-button">DatePicker + DatePicker + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<DatePicker size={size} />
						<DatePicker size={size} />
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="select-select-button">Select + Select + Button</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<Select size={size}>
							<option>2nd</option>
							<option>3rd</option>
							<option>4th</option>
						</Select>
						<Select size={size}>
							<option>2nd</option>
							<option>3rd</option>
							<option>4th</option>
						</Select>
						<Button size={size}>Submit</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="button-checkbox-checkbox-textfield">Button + Checkbox + Checkbox + TextField</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<Button size={size}>Submit</Button>
						<Checkbox size={size} />
						<Checkbox size={size} />
						<TextField size={size} />
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="button-radio-radio-textfield">Button + Radio + Radio + TextField</DocsSubTitle>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<Radio size={size} defaultValue="one">
							<Button size={size}>Submit</Button>
							<Radio.Option value="one" />
							<Radio.Option value="two" />
							<TextField size={size} />
						</Radio>
					</DocsCode.Example>
				</DocsCode>
			))}
			<DocsSubTitle hash="textfield-button-filefield-button-select-button-button">
				TextField[Button] + FileField[Button] + Select[Button] + Button
			</DocsSubTitle>
			<DocsText>
				Boxes within the input fields have <code>m={-2}</code> (margin: -2px)
			</DocsText>
			{Object.keys(sizes).map((size) => (
				<DocsCode key={size} label={`inputField size: ${size}`}>
					<DocsCode.Example>
						<TextField size={size} width={200}>
							<TextField.Input />
							<TextField.Box m={-2}>
								<Button size={size}>OK</Button>
							</TextField.Box>
						</TextField>
						<FileField size={size} width={200}>
							<FileField.Input />
							<FileField.Box m={-2}>
								<Button size={size}>OK</Button>
							</FileField.Box>
						</FileField>
						<Select size={size} width={200}>
							<Select.Input>
								<option>2nd</option>
								<option>3rd</option>
								<option>4th</option>
							</Select.Input>
							<Select.Box m={-2}>
								<Button size={size}>OK</Button>
							</Select.Box>
						</Select>
						<Button size={size}>OK</Button>
					</DocsCode.Example>
				</DocsCode>
			))}
		</>
	);
};
