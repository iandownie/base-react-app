# 11 series UI Styles

Our styles are based off of the [Reveal 11 Style Guide](https://www.figma.com/proto/aHJx2AmxM7WEZN6EMioJRl/Reveal-11-Style-Guide?node-id=3835-66065) in figma.

## Colors

The style guide has a color palette broken down into four categories:

- Primary
- Secondary
- Neutral
- Tertiary

Each of the colors under these categories are referred to by a tag based on their category and darkness level.
i.e. Primary 1 is the darkest blue (P1) and Primary 4 is right in the middle (P4)

These colors use variable names used to define all our contexts, buttons, alerts, etc. (i.e. $P1-color)
Defined in [canon file](variables/canon.scss)

## Contexts

In our [canon file](variables/canon.scss) you can find the colors defined to each of our main contexts:

- backdrop
- surface
- hover
- highlight
- selection
- gradient

Each context will have a matching variable color for both bright and dark mode with the following variables:

- color-bg
- color-contrast-highlight
- color-contrast-main
- color-contrast-alternate
- color-contrast-light
- color-contrast-disabled
- (some but not all also have color-accent)

### Chart colors

```
--chart-color-{number from 0-8, each of which is tied to one of 9 "base" chart colors}-shade-${number 0-10, each of which provides a different shade of the base color, with 0 being the brightest and 10 being the darkest}
```

If you don't need a scale of colors for a chart, then always use --chart-color-{base color number}-5 since shade 5 is the middle "base" color.

## Buttons

_type: primary, secondary, tertiary_

Button styles, found in [default-btn styles](../components/common/atoms/buttons/default-btn/style.scss),
should be applied inline using the [DefaultBtn](../components/common/atoms/buttons/default-btn/index.tsx) rather than in a css selector:
([TransparentButton](../components/common/atoms/buttons/transparent-button/index.tsx) is still available for "cancel" buttons)

```
  <DefaultBtn
    id={"btn-id"}
    style={{ type: "secondary" }}
    onClick={onClick}
  >
    <Translate content={`${prefix}.translation`} />
  </DefaultBtn>
```

## Mixins

[mixins file](_mixins.scss)

### @mixin context($context, $applyColors: boolean)

The context mixin can be used to apply the color context for a selector
`@include context(surface, true)`

The first paramater is the context name,
while the second parameter here is for $apply-colors.
If included and true, it will auto apply a few colors:

```
  background-color: getColor(--bg);
  color: getColor(--contrast-main);
  border-color: getColor(--border-color);
```

### @function getColor($variable, $opacity: 1)

Rather than calling for color variables with var(), we should use the _getColor_ function.
This will result in the same result, while also providing the option to change the color opacity

```
  fill: getColor(--contrast-light);
```

### @mixin alert($type)

_$type: confirmation, warning, error, info_

Alerts will automatically apply context to text color, background, and custom border for the type specified

## Overrides

Sometimes a color may be necessary that doesn't exactly fit our context or bright/dark mode.
Here's a couple of overrides you can use in the css selector:

> $dark-mode: only apply in dark mode
> $getSCSSColor: get specific palette color from variable

```
  #{$dark-mode} {
    background-color: #{getSCSSColor($N2-color)};
  }
```
