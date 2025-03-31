"use client";

import { useState, useEffect } from 'react';
import { Category, Website } from '@/types';

interface QRCode {
  id: string;
  name: string;
  imageUrl: string;
}

interface DBState {
  categories: Category[];
  websites: Website[];
  qrCodes: QRCode[];
}

const defaultQRCode: QRCode = {
  id: "1",
  name: "WeChat Group",
  imageUrl: "/qrcode.jpg"
};

export function useDB() {
  const [state, setState] = useState<DBState>({
    categories: [],
    websites: [],
    qrCodes: [defaultQRCode]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, websitesRes] = await Promise.all([
          fetch('/api/categories'),
          fetch('/api/websites')
        ]);

        const [categories, websites] = await Promise.all([
          categoriesRes.json(),
          websitesRes.json()
        ]);

        setState(prev => ({
          ...prev,
          categories,
          websites
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return state;
} 