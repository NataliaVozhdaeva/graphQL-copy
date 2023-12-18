import { useLocale } from '@localization/useLocale';
import { Button } from '@components/button/button';
import { ActionsPanel } from '@components/graphql/actionsPanel/actionsPanel';
import { Documentation } from '@components/graphql/documentation/documentation';

import classes from './mainPage.module.scss';
import classNames from 'classnames';
import { EndpointForm } from '@components/graphql/endPointForm/endPointForm';
import { useEffect, useState } from 'react';
import { QueryEditor } from '@components/graphql/editor/queryEditor/queryEditor';
import { SandboxContainer } from '@components/sandboxContainer/sandboxContainer';
import { Results } from '@components/graphql/results/results';
import { useSelector } from 'react-redux';
import { selectDocsEnable } from '@redux/docsSlice';

export function MainPage() {
  const { language } = useLocale();
  const isDocsEnable = useSelector(selectDocsEnable);

  const [docsVisibility, setDocsVisibility] = useState(isDocsEnable);

  useEffect(() => {
    setDocsVisibility(isDocsEnable);
  }, [isDocsEnable]);

  return (
    <main className={classes.main}>
      <section className={classes.mainTop}>
        <EndpointForm />
        <Button disabled={!isDocsEnable} mode="light" onClick={() => setDocsVisibility(!docsVisibility)}>
          {language.strings.docShowButton}
        </Button>
      </section>
      <section className={classes.sandBox}>
        <section className={classNames(classes.actionsGridWrapper)}>
          <SandboxContainer>
            <ActionsPanel />
          </SandboxContainer>
        </section>
        <section className={classNames(classes.queryGridWrapper)}>
          <SandboxContainer>
            <QueryEditor />
          </SandboxContainer>
        </section>
        <section className={classNames(classes.resultsGridWrapper)}>
          <SandboxContainer>
            <Results />
          </SandboxContainer>
        </section>
        <section className={classNames(classes.docsGridWrapper, !docsVisibility && classes.docsHidden)}>
          <SandboxContainer>
            <Documentation />
          </SandboxContainer>
        </section>
      </section>
    </main>
  );
}
