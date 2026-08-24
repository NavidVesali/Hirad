# Hirad

Hirad is a Flutter application for browsing and presenting product catalogs, built with a landing page, product sections, and standards/about/contact content.

## Features

- Landing page with hero, about, service, product, and standards sections
- Local persistence via [Hive](https://pub.dev/packages/hive_flutter) for offline product data
- SVG asset rendering with `flutter_svg`
- Video playback support via `video_player`
- Dark theme UI
- Cross-platform support: Android, iOS, Linux, macOS, Windows, and Web

## Getting Started

### Prerequisites

- [Flutter SDK](https://docs.flutter.dev/get-started/install) (`^3.5.4` or compatible)
- A configured platform toolchain for your target (Android Studio, Xcode, etc.)

### Installation

```bash
flutter pub get
```

### Run

```bash
flutter run
```

### Build

```bash
flutter build apk       # Android
flutter build ios       # iOS
flutter build web       # Web
flutter build linux     # Linux
flutter build macos     # macOS
flutter build windows   # Windows
```

## Project Structure