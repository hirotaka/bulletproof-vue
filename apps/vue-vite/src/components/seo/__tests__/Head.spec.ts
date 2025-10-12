import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { useHead } from '@unhead/vue';
import Head from '../Head.vue';

// Mock useHead so tests can run without real unhead integration
vi.mock('@unhead/vue', async () => {
  const actual = await vi.importActual('@unhead/vue');
  return {
    ...(actual as object),
    useHead: vi.fn(),
  };
});

describe('Head', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call useHead with title and suffix when title prop is provided', () => {
    const title = 'Hello World';

    mount(Head, {
      props: { title },
    });

    expect(useHead).toHaveBeenCalledWith({
      title: 'Hello World | Bulletproof Vue',
      meta: [
        {
          name: 'description',
          content: '',
        },
      ],
    });
  });

  it('should call useHead with default title when no title prop is provided', () => {
    mount(Head);

    expect(useHead).toHaveBeenCalledWith({
      title: 'Bulletproof Vue',
      meta: [
        {
          name: 'description',
          content: '',
        },
      ],
    });
  });

  it('should call useHead with description when description prop is provided', () => {
    const description = 'This is a test description';

    mount(Head, {
      props: { description },
    });

    expect(useHead).toHaveBeenCalledWith({
      title: 'Bulletproof Vue',
      meta: [
        {
          name: 'description',
          content: description,
        },
      ],
    });
  });

  it('should call useHead with both title and description', () => {
    const title = 'Test Page';
    const description = 'Test Description';

    mount(Head, {
      props: { title, description },
    });

    expect(useHead).toHaveBeenCalledWith({
      title: 'Test Page | Bulletproof Vue',
      meta: [
        {
          name: 'description',
          content: description,
        },
      ],
    });
  });
});
