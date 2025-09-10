import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type StyleValue = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	containerWidth: OptionType;
	backgroundColor: OptionType;
};

const App = () => {
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
			className={clsx(styles.main)}
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

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
