---
name: Stripe Terminal Expo setup
description: Expo-specific setup constraints for Stripe Terminal and Tap to Pay.
---

Stripe Terminal can be used from an Expo app through `@stripe/stripe-terminal-react-native` plus its Expo config plugin. Real Tap to Pay requires a custom native development build; the standard Expo Go client does not contain the native Terminal module.

**Why:** The SDK is a native React Native module, but Stripe ships a config plugin that adds the required iOS and Android permissions and Tap to Pay hooks during Expo prebuild.

**How to apply:** Keep the Stripe Terminal package in the Expo app package, register its plugin in `app.json`, and treat Stripe credentials, connection tokens, entitlements, and checkout wiring as separate integration work.