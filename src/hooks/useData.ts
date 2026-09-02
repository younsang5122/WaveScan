import { useState, useCallback, useEffect } from 'react';
import { WaveData } from '../utils/data';
import type { ScanData, Stats, NotificationItem } from '../types/index';

export const useData = () => {
  const [scans, setScans] = useState<ScanData[]>(() => WaveData.getScans());
  const [stats, setStats] = useState<Stats>(() => WaveData.getStats());
  const [notifs, setNotifs] = useState<NotificationItem[]>(() => WaveData.getNotifs());

  const refreshData = useCallback(() => {
    setScans(WaveData.getScans());
    setStats(WaveData.getStats());
    setNotifs(WaveData.getNotifs());
  }, []);

  useEffect(() => {
    const handleDataChange = () => {
      refreshData();
    };
    window.addEventListener('storage', handleDataChange);
    window.addEventListener('wavescan_data_change', handleDataChange);
    return () => {
      window.removeEventListener('storage', handleDataChange);
      window.removeEventListener('wavescan_data_change', handleDataChange);
    };
  }, [refreshData]);

  const saveScan = useCallback((scan: ScanData) => {
    const updatedScans = WaveData.saveScan(scan);
    setScans(updatedScans);
    setStats(WaveData.getStats());
    return updatedScans;
  }, []);

  const deleteScan = useCallback((id: string) => {
    const updatedScans = WaveData.deleteScan(id);
    setScans(updatedScans);
    setStats(WaveData.getStats());
    return updatedScans;
  }, []);

  const getScanById = useCallback((id: string) => {
    return WaveData.getScanById(id);
  }, []);

  const markAllNotifRead = useCallback(() => {
    WaveData.markAllNotifRead();
    setNotifs(WaveData.getNotifs());
  }, []);

  const hasUnreadNotif = useCallback(() => {
    return notifs.some((n) => !n.read);
  }, [notifs]);

  return {
    scans,
    stats,
    notifs,
    refreshData,
    saveScan,
    deleteScan,
    getScanById,
    markAllNotifRead,
    hasUnreadNotif,
  };
};


