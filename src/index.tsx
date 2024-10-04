import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [newSettings, setNewSettings] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': newSettings.fontFamilyOption.value,
					'--font-size': newSettings.fontSizeOption.value,
					'--font-color': newSettings.fontColor.value,
					'--container-width': newSettings.contentWidth.value,
					'--bg-color': newSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setNewPageSettings={setNewSettings} />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
