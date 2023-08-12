//@ts-ignore just in case aliases works fine but ts goes mad when it sees them in *.test.ts files
import TheStarRating from '@/components/TheStarRating.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const wrapper = shallowMount(TheStarRating);

describe('TheCell.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});