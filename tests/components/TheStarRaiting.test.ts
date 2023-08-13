//@ts-ignore just in case aliases works fine but ts goes mad when it sees them in *.test.ts files
import TheStarRating from '@/components/TheStarRating.vue';
import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const wrapper = shallowMount(TheStarRating);

describe('TheStarRating.vue component', () => {
  it('is a vue instance', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('setRating() not emitting anything if props.readOnly is true', async () => {
    await wrapper.setProps({readOnly: true });
    
    wrapper.vm.setRating(1);
    
    expect(wrapper.emitted()).not.toHaveProperty('update:rating');
  });
  it('setRating() not emitting "update:rating"', async () => {
    await wrapper.setProps({readOnly: false });

    wrapper.vm.setRating(1);
    
    expect(wrapper.emitted()).toHaveProperty('update:rating');
  });
});