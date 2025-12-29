const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;
const GUESTBOOK_DIR = path.join(__dirname, 'guestbook');
const GUESTBOOK_FILE = path.join(GUESTBOOK_DIR, 'entries.json');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// guestbook 폴더가 없으면 생성
async function ensureGuestbookDir() {
    try {
        await fs.access(GUESTBOOK_DIR);
    } catch {
        await fs.mkdir(GUESTBOOK_DIR, { recursive: true });
    }
}

// 방명록 파일 초기화 (없으면 빈 배열로 생성)
async function initGuestbookFile() {
    try {
        await fs.access(GUESTBOOK_FILE);
    } catch {
        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify([], null, 2), 'utf8');
    }
}

// 방명록 조회 API
app.get('/api/guestbook', async (req, res) => {
    try {
        await ensureGuestbookDir();
        await initGuestbookFile();
        
        const data = await fs.readFile(GUESTBOOK_FILE, 'utf8');
        const entries = JSON.parse(data);
        
        res.json({ success: true, entries });
    } catch (error) {
        console.error('Error reading guestbook:', error);
        res.status(500).json({ success: false, error: '방명록을 읽는 중 오류가 발생했습니다.' });
    }
});

// 방명록 저장 API
app.post('/api/guestbook', async (req, res) => {
    try {
        const { name, message } = req.body;

        // 유효성 검사
        if (!name || !message) {
            return res.status(400).json({ success: false, error: '이름과 메시지를 모두 입력해주세요.' });
        }

        if (name.length > 20) {
            return res.status(400).json({ success: false, error: '이름은 20자 이하로 입력해주세요.' });
        }

        if (message.length > 200) {
            return res.status(400).json({ success: false, error: '메시지는 200자 이하로 입력해주세요.' });
        }

        await ensureGuestbookDir();
        await initGuestbookFile();

        // 기존 데이터 읽기
        const data = await fs.readFile(GUESTBOOK_FILE, 'utf8');
        const entries = JSON.parse(data);

        // 새 엔트리 추가
        const newEntry = {
            name: name.trim(),
            message: message.trim(),
            date: new Date().toISOString()
        };

        entries.push(newEntry);

        // 파일에 저장
        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify(entries, null, 2), 'utf8');

        res.json({ success: true, entry: newEntry });
    } catch (error) {
        console.error('Error saving guestbook:', error);
        res.status(500).json({ success: false, error: '방명록을 저장하는 중 오류가 발생했습니다.' });
    }
});

// 방명록 수정 API
app.put('/api/guestbook/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const { name, message } = req.body;

        // 유효성 검사
        if (!name || !message) {
            return res.status(400).json({ success: false, error: '이름과 메시지를 모두 입력해주세요.' });
        }

        if (name.length > 20) {
            return res.status(400).json({ success: false, error: '이름은 20자 이하로 입력해주세요.' });
        }

        if (message.length > 200) {
            return res.status(400).json({ success: false, error: '메시지는 200자 이하로 입력해주세요.' });
        }

        await ensureGuestbookDir();
        await initGuestbookFile();

        // 기존 데이터 읽기
        const data = await fs.readFile(GUESTBOOK_FILE, 'utf8');
        const entries = JSON.parse(data);

        // 해당 날짜의 엔트리 찾기
        const entryIndex = entries.findIndex(e => e.date === date);
        if (entryIndex === -1) {
            return res.status(404).json({ success: false, error: '방명록을 찾을 수 없습니다.' });
        }

        // 엔트리 수정
        entries[entryIndex] = {
            ...entries[entryIndex],
            name: name.trim(),
            message: message.trim()
        };

        // 파일에 저장
        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify(entries, null, 2), 'utf8');

        res.json({ success: true, entry: entries[entryIndex] });
    } catch (error) {
        console.error('Error updating guestbook:', error);
        res.status(500).json({ success: false, error: '방명록을 수정하는 중 오류가 발생했습니다.' });
    }
});

// 방명록 삭제 API
app.delete('/api/guestbook/:date', async (req, res) => {
    try {
        const { date } = req.params;

        await ensureGuestbookDir();
        await initGuestbookFile();

        // 기존 데이터 읽기
        const data = await fs.readFile(GUESTBOOK_FILE, 'utf8');
        const entries = JSON.parse(data);

        // 해당 날짜의 엔트리 필터링
        const filteredEntries = entries.filter(e => e.date !== date);

        if (filteredEntries.length === entries.length) {
            return res.status(404).json({ success: false, error: '방명록을 찾을 수 없습니다.' });
        }

        // 파일에 저장
        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify(filteredEntries, null, 2), 'utf8');

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting guestbook:', error);
        res.status(500).json({ success: false, error: '방명록을 삭제하는 중 오류가 발생했습니다.' });
    }
});

// 전체 방명록 삭제 API
app.delete('/api/guestbook', async (req, res) => {
    try {
        await ensureGuestbookDir();
        await initGuestbookFile();

        // 빈 배열로 저장
        await fs.writeFile(GUESTBOOK_FILE, JSON.stringify([], null, 2), 'utf8');

        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting all guestbook:', error);
        res.status(500).json({ success: false, error: '방명록을 삭제하는 중 오류가 발생했습니다.' });
    }
});

// 서버 시작
async function startServer() {
    await ensureGuestbookDir();
    await initGuestbookFile();
    
    app.listen(PORT, () => {
        console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
        console.log(`📁 방명록 파일: ${GUESTBOOK_FILE}`);
    });
}

startServer();

