import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

import { FormEvent, useState, useRef, useEffect } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type TSettingsPageProps = {
	setNewPageSettings: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: TSettingsPageProps) => {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const { setNewPageSettings } = props;

	const [addedFormSettings, setAddedFormSettings] =
		useState(defaultArticleState);

	function handleAddedFormSettings(fieldName: keyof ArticleStateType) {
		return (value: OptionType) =>
			setAddedFormSettings((newFormSettings) => ({
				...newFormSettings,
				[fieldName]: value,
			}));
	}

	function handleResetButton(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setNewPageSettings(defaultArticleState);
		setAddedFormSettings(defaultArticleState);
		setIsOpenSidebar(false);
	}

	function handleSubmitButton(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setNewPageSettings(addedFormSettings);
		setIsOpenSidebar(false);
	}

	const ref = useRef<HTMLDivElement | null>(null);

	function onClickSidebar() {
		setIsOpenSidebar(!isOpenSidebar);
	}

	useEffect(() => {
		if (!isOpenSidebar) return;
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				isOpenSidebar &&
				ref.current &&
				!ref.current.contains(event.target as Node)
			) {
				setIsOpenSidebar(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpenSidebar, setAddedFormSettings]);

	return (
		<>
			<ArrowButton isOpen={isOpenSidebar} onClick={onClickSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpenSidebar,
				})}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmitButton}
					onReset={handleResetButton}>
					<Text weight={800} size={31} uppercase as='h2'>
						{'задайте параметры'}
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={addedFormSettings.fontFamilyOption}
						onChange={handleAddedFormSettings('fontFamilyOption')}
					/>
					<RadioGroup
						title='размер шрифта'
						options={fontSizeOptions}
						name={'fontSize'}
						selected={addedFormSettings.fontSizeOption}
						onChange={handleAddedFormSettings('fontSizeOption')}
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={addedFormSettings.fontColor}
						onChange={handleAddedFormSettings('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={addedFormSettings.backgroundColor}
						onChange={handleAddedFormSettings('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={addedFormSettings.contentWidth}
						onChange={handleAddedFormSettings('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
