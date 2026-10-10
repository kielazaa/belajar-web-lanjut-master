import { Elysia } from "elysia";

const mahasiswa = [
    {
        id: 1,
        nama: "Ollie",
        email: "ollie@example.com",
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Jake",
        email: "jake@example.com",
        jurusan: "Manajemen Informatika"
    },
    {
        id: 3,
        nama: "Irul",
        email: "irul@example.com",
        jurusan: "Teknik Informatika"
    }
];

export const mahasiswaRoute = new Elysia({
    prefix: "/mahasiswa"
});

mahasiswaRoute.get("/:id", ({ params }) => {
    const mahasiswaId = params.id;
    const data = mahasiswa.find(m => m.id === parseInt(mahasiswaId));
    if (data) {
        return data;
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.post("/", ({ params, body }) => {
    if (body) {
        return body;
    } else {
        return { error: "Tidak ada data yang masuk" };
    }
});

// PUT = ganti SELURUH data mahasiswa
mahasiswaRoute.put("/:id", ({ params, body }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    mahasiswa[index] = { ...(body as any), id: mahasiswa[index].id };
    return mahasiswa[index];
});

// PATCH = ubah SEBAGIAN data aja
mahasiswaRoute.patch("/:id", ({ params, body }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    mahasiswa[index] = { ...mahasiswa[index], ...(body as any), id: mahasiswa[index].id };
    return mahasiswa[index];
});

// DELETE = hapus mahasiswa
mahasiswaRoute.delete("/:id", ({ params }) => {
    const index = mahasiswa.findIndex(m => m.id === parseInt(params.id));
    if (index === -1) {
        return { error: "Mahasiswa tidak ditemukan" };
    }
    const dihapus = mahasiswa.splice(index, 1);
    return { pesan: "Berhasil dihapus", data: dihapus[0] };
});

// CONNECT
mahasiswaRoute.connect("/", () => {
    return { pesan: "CONNECT berhasil" };
});