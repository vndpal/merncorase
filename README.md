# merncorase


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