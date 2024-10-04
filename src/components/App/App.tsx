import styles from './App.module.scss';
import { useState, CSSProperties } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { defaultArticleState } from '../../constants/articleProps';

export const App = () => {
	const [newSettings, setNewSettings] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
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
