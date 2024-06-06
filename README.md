To change the header color of a `DialogWindow` in Visual Studio based on the theme, you'll need to extend the `DialogWindow` and customize the header template. Here’s how you can achieve this:

### Step 1: Create a Theme Helper

First, ensure you have a helper class to detect the current Visual Studio theme:

```csharp
using Microsoft.VisualStudio.Shell;
using Microsoft.VisualStudio.Shell.Interop;
using System;

public static class ThemeHelper
{
    public static bool IsDarkTheme()
    {
        var shell = (IVsUIShell5)ServiceProvider.GlobalProvider.GetService(typeof(SVsUIShell));
        if (shell == null)
        {
            throw new InvalidOperationException("Cannot get SVsUIShell service.");
        }

        Guid themeId;
        shell.GetVSSysColorEx((int)__VSSYSCOLOREX3.VSCOLOR_THEMEID, out object value);
        themeId = (Guid)value;

        // Dark theme GUID, adjust if necessary
        Guid darkThemeId = new Guid("1ded0138-47ce-435e-84ef-9ec1f439b749");
        return themeId == darkThemeId;
    }
}
```

### Step 2: Create a Custom `DialogWindow`

Extend the `DialogWindow` class and apply the theme-specific header color:

```csharp
using Microsoft.VisualStudio.PlatformUI;
using System.Windows;
using System.Windows.Media;

namespace MyExtension
{
    public partial class MyDialogWindow : DialogWindow
    {
        public MyDialogWindow()
        {
            InitializeComponent();
            ApplyThemeColors();
        }

        private void ApplyThemeColors()
        {
            if (ThemeHelper.IsDarkTheme())
            {
                HeaderBackground = new SolidColorBrush(Colors.Black);
            }
            else
            {
                HeaderBackground = new SolidColorBrush(Colors.White);
            }
        }

        public Brush HeaderBackground
        {
            get { return (Brush)GetValue(HeaderBackgroundProperty); }
            set { SetValue(HeaderBackgroundProperty, value); }
        }

        public static readonly DependencyProperty HeaderBackgroundProperty =
            DependencyProperty.Register("HeaderBackground", typeof(Brush), typeof(MyDialogWindow), new PropertyMetadata(Brushes.White));
    }
}
```

### Step 3: Define the Custom Header Template in XAML

Create a custom template for the `DialogWindow` header in your XAML:

```xml
<platform:DialogWindow x:Class="MyExtension.MyDialogWindow"
                       xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
                       xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                       xmlns:platform="clr-namespace:Microsoft.VisualStudio.PlatformUI;assembly=Microsoft.VisualStudio.Shell.UI.Internal"
                       Title="MyDialogWindow" Height="300" Width="400">
    <platform:DialogWindow.Resources>
        <Style TargetType="platform:DialogWindow">
            <Setter Property="Template">
                <Setter.Value>
                    <ControlTemplate TargetType="platform:DialogWindow">
                        <Border BorderBrush="{TemplateBinding BorderBrush}" BorderThickness="{TemplateBinding BorderThickness}">
                            <DockPanel>
                                <!-- Header -->
                                <Border Background="{Binding HeaderBackground, RelativeSource={RelativeSource AncestorType=platform:DialogWindow}}">
                                    <DockPanel>
                                        <ContentPresenter Content="{TemplateBinding Title}" HorizontalAlignment="Center" VerticalAlignment="Center" />
                                    </DockPanel>
                                </Border>
                                <!-- Content -->
                                <ContentPresenter />
                            </DockPanel>
                        </Border>
                    </ControlTemplate>
                </Setter.Value>
            </Setter>
        </Style>
    </platform:DialogWindow.Resources>
    <Grid>
        <!-- Your dialog window content here -->
    </Grid>
</platform:DialogWindow>
```

### Explanation

1. **ThemeHelper**: Detects the current Visual Studio theme.
2. **MyDialogWindow Class**: Extends `DialogWindow` and uses a dependency property `HeaderBackground` to store the header background brush.
3. **XAML Template**: Defines a custom template for the `DialogWindow`, with a `Border` in the header whose `Background` is bound to the `HeaderBackground` property of the `DialogWindow`.

This setup ensures that the header color changes based on the current Visual Studio theme. Adjust the GUID for the dark theme as necessary to match the actual GUID used by Visual Studio for its dark theme.