import { describe, expect, it } from 'vitest';
import { createDefaultState } from './defaults';
import { parseState } from './storage';

describe('parseState', () => {
  it('accepts a valid v1 snapshot', () => {
    const saved = createDefaultState();
    expect(parseState(saved)?.kidName).toBe('Aliyah');
    expect(parseState(saved)?.chores.length).toBeGreaterThan(0);
  });

  it('rejects a tampered or versionless payload', () => {
    expect(parseState({ ...createDefaultState(), version: 2 })).toBeNull();
    expect(parseState({ ...createDefaultState(), points: -4 })).toBeNull();
    expect(parseState({ hello: 'nope' })).toBeNull();
  });
});
