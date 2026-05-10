'use server'

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim() || null;
  const phone = (formData.get('phone') as string)?.trim();
  const message = (formData.get('message') as string)?.trim();

  if (!name || !phone || !message) {
    return { status: 'error', message: 'Mohon lengkapi semua kolom yang wajib diisi.' };
  }

  try {
    const res = await fetch(
      'https://dashboard.wikimedia.or.id/api/v1/contact/situs-komunitas',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message }),
        signal: AbortSignal.timeout(10000),
      }
    );

    const json = await res.json();

    if (res.ok && json.success) {
      return { status: 'success', message: 'Terima kasih! Pesan Anda telah berhasil dikirim.' };
    }

    return {
      status: 'error',
      message: json.message ?? 'Maaf, terjadi kesalahan. Silakan coba lagi.',
    };
  } catch {
    return { status: 'error', message: 'Maaf, terjadi kesalahan koneksi.' };
  }
}
