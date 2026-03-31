'use client';

import { useState, useRef } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/card';
import { useProfileStore } from '@/lib/store/useProfileStore';
import { useSubjectStore } from '@/lib/store/useSubjectStore';
import { GRADE_LABELS, STORAGE_KEYS } from '@/lib/constants';
import type { GradeLevel, Semester } from '@/lib/types';
import { Moon, Sun, User, BookOpen, Database, Info, Sparkles, Check, Download, Upload } from 'lucide-react';
import { useSeasonTheme } from '@/lib/hooks/useSeasonTheme';

export default function SettingsPage() {
  const { profile, setGrade, setSemester, toggleTheme } = useProfileStore();
  const subjects = useSubjectStore((s) => s.subjects);
  const { isAprilSeason, enabled: seasonEnabled, toggle: toggleSeason } = useSeasonTheme();

  const [draftGrade, setDraftGrade] = useState<GradeLevel>(profile.grade);
  const [draftSemester, setDraftSemester] = useState<Semester>(profile.semester);
  const [saved, setSaved] = useState(false);
  const [importStatus, setImportStatus] = useState<'idle' | 'ok' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDirty = draftGrade !== profile.grade || draftSemester !== profile.semester;

  const handleSave = () => {
    setGrade(draftGrade);
    setSemester(draftSemester);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExport = () => {
    const data: Record<string, unknown> = { exportedAt: new Date().toISOString() };
    Object.values(STORAGE_KEYS).forEach((key) => {
      const val = localStorage.getItem(key);
      if (val) data[key] = JSON.parse(val);
    });
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mykeep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Record<string, unknown>;
        Object.values(STORAGE_KEYS).forEach((key) => {
          if (data[key] !== undefined) {
            localStorage.setItem(key, JSON.stringify(data[key]));
          }
        });
        setImportStatus('ok');
        setTimeout(() => window.location.reload(), 800);
      } catch {
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const gradeOptions = Object.entries(GRADE_LABELS) as [GradeLevel, string][];

  return (
    <div>
      <PageHeader title="설정" />
      <div className="space-y-4 px-4 py-4">
        {/* Profile */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <User size={18} className="text-primary" />
            <h3 className="text-base font-semibold">프로필</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">학년</label>
              <select
                value={draftGrade}
                onChange={(e) => setDraftGrade(e.target.value as GradeLevel)}
                className="w-full rounded-md border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-primary)]"
              >
                {gradeOptions.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-1">학기</label>
              <div className="flex gap-2">
                {(['1', '2'] as Semester[]).map((sem) => (
                  <button
                    key={sem}
                    onClick={() => setDraftSemester(sem)}
                    className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
                      draftSemester === sem
                        ? 'bg-primary text-white'
                        : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {sem}학기
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={!isDirty && !saved}
              className={`w-full flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-semibold transition-all ${
                saved
                  ? 'bg-green-500 text-white'
                  : isDirty
                  ? 'bg-primary text-white hover:opacity-90 active:scale-95'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] cursor-not-allowed'
              }`}
            >
              {saved ? (
                <>
                  <Check size={15} />
                  저장됨
                </>
              ) : (
                '저장'
              )}
            </button>
          </div>
        </Card>

        {/* Appearance */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            {profile.theme === 'dark' ? (
              <Moon size={18} className="text-primary" />
            ) : (
              <Sun size={18} className="text-primary" />
            )}
            <h3 className="text-base font-semibold">외관</h3>
          </div>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between rounded-md bg-[var(--bg-secondary)] px-4 py-3"
          >
            <span className="text-sm">테마</span>
            <span className="text-sm text-[var(--text-secondary)]">
              {profile.theme === 'light' ? '라이트 모드' : '다크 모드'}
            </span>
          </button>

          {isAprilSeason && (
            <div className="mt-2 rounded-md bg-[var(--bg-secondary)] px-4 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Sparkles size={14} className="text-pink-400" />
                    <span className="text-sm font-medium">🌸 시즌 테마</span>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">4월 벚꽃 블링블링 모드</p>
                </div>
                <button
                  onClick={toggleSeason}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    seasonEnabled ? 'bg-pink-400' : 'bg-[var(--border)]'
                  }`}
                  role="switch"
                  aria-checked={seasonEnabled}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      seasonEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Subjects */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={18} className="text-primary" />
            <h3 className="text-base font-semibold">과목 관리</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <span
                key={subject.id}
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: `${subject.color}15`,
                  color: subject.color,
                }}
              >
                {subject.name}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            과목은 기본 프리셋으로 자동 생성됩니다
          </p>
        </Card>

        {/* Data */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Database size={18} className="text-primary" />
            <h3 className="text-base font-semibold">데이터 이전</h3>
          </div>
          <div className="space-y-2">
            {/* Export */}
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-3 rounded-md bg-[var(--bg-secondary)] px-4 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <Download size={16} className="text-primary shrink-0" />
              <div className="text-left">
                <p className="font-medium">데이터 내보내기</p>
                <p className="text-xs text-[var(--text-muted)]">PC → 파일 저장 후 모바일에서 가져오기</p>
              </div>
            </button>

            {/* Import */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-full flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                importStatus === 'ok'
                  ? 'bg-green-500/10 text-green-600'
                  : importStatus === 'error'
                  ? 'bg-red-500/10 text-red-500'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
              }`}
            >
              {importStatus === 'ok' ? (
                <Check size={16} className="text-green-500 shrink-0" />
              ) : (
                <Upload size={16} className="text-primary shrink-0" />
              )}
              <div className="text-left">
                <p className="font-medium">
                  {importStatus === 'ok' ? '가져오기 완료! 재시작 중...' : importStatus === 'error' ? '파일 오류 — 다시 시도해 주세요' : '데이터 가져오기'}
                </p>
                <p className="text-xs text-[var(--text-muted)]">백업 파일(.json)을 선택하면 자동 적용</p>
              </div>
            </button>
            <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={handleImport} />

            {/* Reset */}
            <button
              onClick={() => {
                if (confirm('모든 데이터를 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="w-full rounded-md bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-500/20 transition-colors"
            >
              데이터 초기화
            </button>
          </div>
        </Card>

        {/* App Info */}
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Info size={18} className="text-primary" />
            <h3 className="text-base font-semibold">앱 정보</h3>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">버전</span>
            <span className="text-[var(--text-muted)]">v0.1.0</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
