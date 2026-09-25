import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

type DaySchedule = { day: string; short: string; enabled: boolean; hours: string };
const initialHours: DaySchedule[] = [
  { day: 'Monday', short: 'M', enabled: true, hours: '9:00 AM – 5:00 PM' },
  { day: 'Tuesday', short: 'T', enabled: true, hours: '9:00 AM – 5:00 PM' },
  { day: 'Wednesday', short: 'W', enabled: true, hours: '10:00 AM – 6:00 PM' },
  { day: 'Thursday', short: 'T', enabled: true, hours: '9:00 AM – 5:00 PM' },
  { day: 'Friday', short: 'F', enabled: true, hours: '9:00 AM – 4:00 PM' },
  { day: 'Saturday', short: 'S', enabled: true, hours: '10:00 AM – 3:00 PM' },
  { day: 'Sunday', short: 'S', enabled: false, hours: 'Closed' },
];

export default function MoreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ screen?: string }>();
  const [availability, setAvailability] = useState<DaySchedule[]>(initialHours);
  const [blocked, setBlocked] = useState(false);
  const [reminders, setReminders] = useState(true);
  const topInset = Platform.OS === 'web' ? 67 : insets.top;
  const showingAvailability = params.screen === 'availability';

  const goToAvailability = () => router.push('/(tabs)/more?screen=availability');
  const leaveAvailability = () => router.replace('/(tabs)/more');
  const goToSection = (screen: 'services' | 'payments') => router.push(`/(tabs)/more?screen=${screen}`);

  return (
    <View style={[styles.root, { backgroundColor: colors.background, paddingTop: topInset }]}>
      {showingAvailability ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity testID="availability-back" onPress={leaveAvailability} style={styles.backRow}><Feather name="arrow-left" size={19} color={colors.foreground} /><Text style={[styles.backText, { color: colors.foreground }]}>More</Text></TouchableOpacity>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>WHEN YOU WORK</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Availability</Text>
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>Set the hours clients can request.</Text>
          <View style={[styles.availabilityIntro, { backgroundColor: colors.secondary }]}><View style={[styles.clockIcon, { backgroundColor: colors.card }]}><Feather name="clock" size={18} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Weekly hours</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Changes are saved in this preview only.</Text></View><Feather name="edit-2" size={15} color={colors.primary} /></View>
          <View style={styles.dayList}>
            {availability.map((day, index) => <View key={day.day} style={[styles.dayRow, { backgroundColor: colors.card, borderColor: colors.border, opacity: day.enabled ? 1 : 0.63 }]}><View style={[styles.dayCircle, { backgroundColor: day.enabled ? colors.secondary : colors.muted }]}><Text style={[styles.dayInitial, { color: day.enabled ? colors.primary : colors.mutedForeground }]}>{day.short}</Text></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>{day.day}</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>{day.hours}</Text></View><Switch testID={`toggle-${day.day}`} value={day.enabled} onValueChange={(enabled) => setAvailability((current) => current.map((item, itemIndex) => itemIndex === index ? { ...item, enabled, hours: enabled ? item.day === 'Sunday' ? '10:00 AM – 2:00 PM' : item.hours === 'Closed' ? '9:00 AM – 5:00 PM' : item.hours : 'Closed' } : item))} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.card} /></View>)}
          </View>
          <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 24 }]}>Time off</Text>
          <TouchableOpacity testID="block-time" onPress={() => setBlocked((current) => !current)} style={[styles.timeOffCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.timeOffIcon, { backgroundColor: colors.accent }]}><Feather name="calendar" size={17} color={colors.accentForeground} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>{blocked ? 'Friday · Sep 25' : 'Block out time'}</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>{blocked ? 'All day · Tap to remove' : 'Add a day or time you’re unavailable'}</Text></View><Feather name={blocked ? 'x-circle' : 'plus'} size={18} color={colors.primary} /></TouchableOpacity>
        </ScrollView>
      ) : params.screen === 'services' ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity testID="services-back" onPress={leaveAvailability} style={styles.backRow}><Feather name="arrow-left" size={19} color={colors.foreground} /><Text style={[styles.backText, { color: colors.foreground }]}>More</Text></TouchableOpacity>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR MENU</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Services & pricing</Text>
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>A preview of the services clients can book.</Text>
          <View style={styles.serviceList}>
            {[{ title: 'Brow shaping', duration: '45 minutes', price: '$48', icon: 'eye' as const }, { title: 'Signature facial', duration: '1 hour 15 minutes', price: '$125', icon: 'droplet' as const }, { title: 'Mobile glam', duration: '1 hour', price: '$95', icon: 'briefcase' as const }, { title: 'Lash lift', duration: '1 hour', price: '$78', icon: 'star' as const }].map((service) => <View key={service.title} style={[styles.serviceRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}><Feather name={service.icon} size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>{service.title}</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>{service.duration}</Text></View><Text style={[styles.servicePrice, { color: colors.foreground }]}>{service.price}</Text></View>)}
          </View>
          <View style={[styles.readOnlyNote, { backgroundColor: colors.accent }]}><Feather name="info" size={16} color={colors.accentForeground} /><Text style={[styles.readOnlyText, { color: colors.accentForeground }]}>Service management will sync with your Certxa catalog when you connect your platform.</Text></View>
        </ScrollView>
      ) : params.screen === 'payments' ? (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity testID="payments-back" onPress={leaveAvailability} style={styles.backRow}><Feather name="arrow-left" size={19} color={colors.foreground} /><Text style={[styles.backText, { color: colors.foreground }]}>More</Text></TouchableOpacity>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>GET PAID</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>Payments</Text>
          <Text style={[styles.caption, { color: colors.mutedForeground }]}>Your checkout experience, ready for your platform.</Text>
          <View style={[styles.paymentCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.paymentMark, { backgroundColor: colors.secondary }]}><Feather name="credit-card" size={20} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Stripe Connect</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Not connected · Preview only</Text></View><View style={[styles.statusPill, { backgroundColor: colors.accent }]}><Text style={[styles.statusText, { color: colors.accentForeground }]}>LATER</Text></View></View>
          <View style={[styles.paymentInfo, { backgroundColor: colors.secondary }]}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Tap to Pay</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground, marginTop: 7 }]}>The checkout screen includes a native payment-flow preview. Your team can wire Stripe Terminal and Tap to Pay into Certxa when the platform APIs are ready.</Text></View>
          <TouchableOpacity testID="open-checkout" onPress={() => router.push('/(tabs)/checkout')} style={[styles.primaryAction, { backgroundColor: colors.primary }]}><Feather name="arrow-right" size={16} color={colors.primaryForeground} /><Text style={[styles.primaryActionText, { color: colors.primaryForeground }]}>Preview checkout</Text></TouchableOpacity>
          <Text style={[styles.paymentDisclaimer, { color: colors.mutedForeground }]}>This prototype does not connect to Stripe or process transactions.</Text>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>YOUR BUSINESS</Text>
          <Text style={[styles.title, { color: colors.foreground }]}>More</Text>
          <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.profileAvatar, { backgroundColor: colors.secondary }]}><Text style={[styles.avatarText, { color: colors.primary }]}>ML</Text></View><View style={{ flex: 1 }}><Text style={[styles.profileName, { color: colors.foreground }]}>Mira Lane</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Independent beauty professional</Text></View></View>
          <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 28, marginBottom: 12 }]}>Manage</Text>
          <View style={styles.menuList}>
            <TouchableOpacity testID="menu-availability" onPress={goToAvailability} style={[styles.menuRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}><Feather name="clock" size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Availability</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Set working hours and time off</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></TouchableOpacity>
            <TouchableOpacity testID="menu-services" onPress={() => goToSection('services')} style={[styles.menuRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.accent }]}><Feather name="scissors" size={17} color={colors.accentForeground} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Services & pricing</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Your menu, duration, and rates</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></TouchableOpacity>
            <TouchableOpacity testID="menu-payment" onPress={() => goToSection('payments')} style={[styles.menuRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.muted }]}><Feather name="credit-card" size={17} color={colors.foreground} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Payments</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Connect your payment account later</Text></View><Feather name="chevron-right" size={17} color={colors.mutedForeground} /></TouchableOpacity>
          </View>
          <Text style={[styles.sectionTitle, { color: colors.foreground, marginTop: 27, marginBottom: 12 }]}>Preferences</Text>
          <View style={[styles.preferenceRow, { backgroundColor: colors.card, borderColor: colors.border }]}><View style={[styles.menuIcon, { backgroundColor: colors.secondary }]}><Feather name="bell" size={17} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.itemTitle, { color: colors.foreground }]}>Appointment reminders</Text><Text style={[styles.itemSubtitle, { color: colors.mutedForeground }]}>Preview setting</Text></View><Switch testID="reminders-toggle" value={reminders} onValueChange={setReminders} trackColor={{ false: colors.border, true: colors.primary }} thumbColor={colors.card} /></View>
          <View style={[styles.certxaCard, { backgroundColor: colors.primary }]}><Text style={[styles.certxaBrand, { color: colors.primaryForeground }]}>CERTXA PRO</Text><Text style={[styles.certxaTitle, { color: colors.primaryForeground }]}>Your business, beautifully in sync.</Text><Text style={[styles.certxaSub, { color: colors.primaryForeground }]}>Platform connection can be added when your Certxa APIs are ready.</Text></View>
          <Text style={[styles.version, { color: colors.mutedForeground }]}>DESIGN PREVIEW · 1.0</Text>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 120 },
  eyebrow: { fontSize: 10, letterSpacing: 1.4, fontFamily: 'Inter_700Bold' },
  title: { fontSize: 27, letterSpacing: -0.5, fontFamily: 'Inter_600SemiBold', marginTop: 4 },
  caption: { fontSize: 13, fontFamily: 'Inter_400Regular', marginTop: 7, marginBottom: 22 },
  profileCard: { borderWidth: 1, borderRadius: 17, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 23 },
  profileAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 14, fontFamily: 'Inter_700Bold' },
  profileName: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  sectionTitle: { fontSize: 16, fontFamily: 'Inter_600SemiBold' },
  menuList: { gap: 9 },
  menuRow: { borderWidth: 1, borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11, minHeight: 70 },
  menuIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  itemSubtitle: { fontSize: 11, fontFamily: 'Inter_400Regular', marginTop: 4, lineHeight: 16 },
  preferenceRow: { borderWidth: 1, borderRadius: 15, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  certxaCard: { borderRadius: 19, padding: 18, marginTop: 22 },
  certxaBrand: { fontSize: 9, letterSpacing: 1.6, fontFamily: 'Inter_700Bold' },
  certxaTitle: { fontSize: 17, lineHeight: 23, fontFamily: 'Inter_600SemiBold', marginTop: 11, maxWidth: 260 },
  certxaSub: { fontSize: 11, lineHeight: 17, fontFamily: 'Inter_400Regular', marginTop: 7, opacity: 0.82 },
  version: { textAlign: 'center', fontSize: 9, letterSpacing: 1.3, fontFamily: 'Inter_600SemiBold', marginTop: 23 },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 26 },
  backText: { fontSize: 13, fontFamily: 'Inter_500Medium' },
  availabilityIntro: { borderRadius: 16, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 5, marginBottom: 15 },
  clockIcon: { width: 39, height: 39, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  dayList: { gap: 8 },
  dayRow: { borderWidth: 1, borderRadius: 15, minHeight: 66, paddingHorizontal: 11, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 10 },
  dayCircle: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  dayInitial: { fontSize: 12, fontFamily: 'Inter_600SemiBold' },
  timeOffCard: { borderWidth: 1, borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 12 },
  timeOffIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  serviceList: { gap: 9, marginTop: 4 },
  serviceRow: { borderWidth: 1, borderRadius: 15, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 11, minHeight: 66 },
  servicePrice: { fontSize: 14, fontFamily: 'Inter_600SemiBold' },
  readOnlyNote: { borderRadius: 14, padding: 13, flexDirection: 'row', alignItems: 'flex-start', gap: 9, marginTop: 18 },
  readOnlyText: { flex: 1, fontSize: 11, lineHeight: 16, fontFamily: 'Inter_500Medium' },
  paymentCard: { borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 5 },
  paymentMark: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  statusPill: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 10 },
  statusText: { fontSize: 9, letterSpacing: 0.8, fontFamily: 'Inter_700Bold' },
  paymentInfo: { borderRadius: 15, padding: 15, marginTop: 12 },
  primaryAction: { height: 50, borderRadius: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 9, marginTop: 18 },
  primaryActionText: { fontSize: 13, fontFamily: 'Inter_600SemiBold' },
  paymentDisclaimer: { textAlign: 'center', fontSize: 10, fontFamily: 'Inter_400Regular', lineHeight: 15, marginTop: 14 },
});