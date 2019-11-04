# Koldy UI Light Theme

This is a theme that should be plugged in [koldy-ui](https://github.com/koldy/ui) package.

```ecmascript 6
import React from 'react';
import {App, ThemeManager} from 'koldy-ui';
import lightTheme from 'koldy-ui-light-theme';

const theme = new ThemeManager({
  json: lightTheme,
  mode: 'debug'
});

const MyWeb = function () {
  return (
    <App theme={theme}>
      Hi there!
    </App>
  );
};
```

Visit [koldy.io](https://koldy.io) for more info.
