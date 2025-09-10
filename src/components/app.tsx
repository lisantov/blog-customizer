import { CSSProperties, useState } from 'react';
import styles from '../styles/index.module.scss';

import { Article } from './article';
import { ArticleParamsForm } from './article-params-form';
import { defaultArticleState, OptionType } from '../constants/articleProps';

export type StyleValue = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	containerWidth: OptionType;
	backgroundColor: OptionType;
};

export const App = () => {
	const [styleValue, setStyleValue] = useState<StyleValue>({
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		containerWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});

	const handleNewStyles = (newStyles: StyleValue) => {
		setStyleValue(newStyles);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleValue.fontFamily.value,
					'--font-size': styleValue.fontSize.value,
					'--font-color': styleValue.fontColor.value,
					'--container-width': styleValue.containerWidth.value,
					'--bg-color': styleValue.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleNewStyles} initialState={styleValue} />
			<Article />
		</main>
	);
};
