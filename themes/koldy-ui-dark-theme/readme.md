# Koldy UI Dark Theme

This is a theme that should be plugged in [koldy-ui](https://github.com/koldy/ui) package.

```ecmascript 6
import React from 'react';
import {App, ThemeManager} from 'koldy-ui';
import darkTheme from 'themes/koldy-ui-dark-theme/src/koldy-ui-dark-theme';

const theme = new ThemeManager({
  json: darkTheme,
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
