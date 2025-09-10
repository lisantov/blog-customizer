import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { StyleValue } from 'src/index';

type ArticleParamsFormProps = {
	onSubmit: (newStyles: StyleValue) => void;
	initialState?: StyleValue;
	isInitialOpen?: boolean;
};

export const ArticleParamsForm = ({
	isInitialOpen = false,
	initialState = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	},
	onSubmit,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formValue, setFormValue] = useState<StyleValue>(initialState);
	const handleClick = () => {
		isOpen ? close() : open();
	};
	const open = () => {
		asideRef.current?.classList.add(styles.container_open);
		setIsOpen(true);
	};
	const close = () => {
		asideRef.current?.classList.remove(styles.container_open);
		setIsOpen(false);
	};

	useEffect(() => {
		isInitialOpen ? open() : close();
	}, []);

	const handleChange = (name: string) => (selected: OptionType) => {
		setFormValue({
			...formValue,
			[name]: selected,
		});
	};

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		onSubmit({
			fontFamily: formValue.fontFamily,
			fontSize: formValue.fontSize,
			fontColor: formValue.fontColor,
			containerWidth: formValue.containerWidth,
			backgroundColor: formValue.backgroundColor,
		});
	};

	const handleReset = (event: SyntheticEvent) => {
		event.preventDefault();
		setFormValue(initialState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside ref={asideRef} className={styles.container}>
				<form className={styles.form}>
					<div className={styles.topContainer}>
						<Select
							selected={formValue.fontFamily}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={handleChange('fontFamily')}
						/>
						<RadioGroup
							name='fontSize'
							selected={formValue.fontSize}
							options={fontSizeOptions}
							title='Размер шрифта'
							onChange={handleChange('fontSize')}
						/>
						<Select
							selected={formValue.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={handleChange('fontColor')}
						/>
						<Separator />
						<Select
							selected={formValue.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={handleChange('backgroundColor')}
						/>
						<Select
							selected={formValue.containerWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={handleChange('containerWidth')}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={handleSubmit}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
